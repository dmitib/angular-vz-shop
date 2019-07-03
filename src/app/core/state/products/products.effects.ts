import { Injectable } from '@angular/core';

import { EMPTY, Observable, of } from 'rxjs';
import { concatMap, switchMap, withLatestFrom  } from 'rxjs/operators';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { ProductsService } from '../../../products/services/products.service';
import * as act from './products.actions';
import { AppState } from '../app.state';
import { getRouterParam } from '../router/router.selectors';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {}

  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType<act.GetProducts>(act.GET_PRODUCTS),
    switchMap(() =>
      this.productsService
        .getProducts()
        .then(products => new act.GetProductsSuccess(products))
        .catch(err => new act.GetProductsError(err))
    )
  );

  @Effect()
  getProduct$: Observable<Action> = this.actions$.pipe(
    ofType<act.GetProduct>(act.GET_PRODUCT),
    switchMap(action =>
      this.productsService
        .getProduct(action.payload)
        .then(product => new act.GetProductSuccess(product))
        .catch(err => new act.GetProductError(err))
    )
  );

  @Effect()
  editProduct$: Observable<Action> = this.actions$.pipe(
    ofType<act.EditProduct>(act.EDIT_PRODUCT),
    concatMap(action =>
      this.productsService
        .editProduct(action.payload)
        .then(product => new act.EditProductSuccess(product))
        .catch(err => new act.EditProductError(err))
    )
  );

  @Effect()
  addProduct$: Observable<Action> = this.actions$.pipe(
    ofType<act.AddProduct>(act.ADD_PRODUCT),
    concatMap(action =>
      this.productsService
        .addProduct(action.payload)
        .then(product => new act.AddProductSuccess(product))
        .catch(err => new act.AddProductError(err))
    )
  );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.pipe(
    ofType<act.DeleteProduct>(act.DELETE_PRODUCT),
    // желательно указать тип для action, иначе получаем предупреждение, что payload может не существовать
    // и выше тоже самое.
    concatMap(action =>
      this.productsService
        .deleteProduct(action.payload)
        .then(() => new act.DeleteProductSuccess(action.payload))
        .catch(err => new act.DeleteProductError(err))
    )
  );

  // Насколько я понимаю, то делать это нет необходимости,
  // та как данне есть в сторе и можно написать селектор для их отбора.
  @Effect()
  getProductFromUrl$: Observable<Action> = this.actions$.pipe(
    ofType<act.GetProductFromUrl>(act.GET_PRODUCT_FROM_URL),
    withLatestFrom(this.store.select(getRouterParam('productID'))),
    switchMap(([_, param]) => {
      if (param) {
        return of(new act.GetProduct(+param));
      }

      return EMPTY;
    })
  );
}
