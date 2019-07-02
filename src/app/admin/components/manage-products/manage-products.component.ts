import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import { ProductModel } from '../../../products/models/product.model';
import { AppState } from '../../../core/state/app.state';
import * as act from '../../../core/state/products/products.actions';
import {
  getProductEditComplete,
  getProducts
} from '../../../core/state/products/products.selectors';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products$: Observable<ProductModel[]>;

  private sub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.products$ = this.store.pipe(select(getProducts));
    this.sub = this.store
      .pipe(
        select(getProductEditComplete),
        // желательно добавить тип
        filter((editComplete: boolean) => editComplete)
      )
      .subscribe(() => this.store.dispatch(new act.GetProducts()));

    this.store.dispatch(new act.GetProducts());
  }

  ngOnDestroy() {
    // условие не обязательно
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onDelete(product: ProductModel) {
    this.store.dispatch(new act.DeleteProduct(product.id));
  }
}
