import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from '../../core/state/app.state';
import { Go } from '../../core/state/router/router.actions';
import { ProductModel } from '../../products/models/product.model';
import { ProductsService } from '../../products/services';

@Injectable()
export class ProductResolveGuard implements Resolve<ProductModel> {
  constructor(
    private productsService: ProductsService,
    private store: Store<AppState>
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<ProductModel> {
    if (!route.paramMap.has('productID')) {
      return Promise.resolve(new ProductModel());
    }

    const id = +route.paramMap.get('productID');
    try {
      const p = await this.productsService.getProduct(id);
      if (p) {
        return p;
      } else {
        this.store.dispatch(new Go({ path: ['/admin/products'] }));
        return null;
      }
    } catch (e) {
      this.store.dispatch(new Go({ path: ['/admin/products'] }));
      return null;
    }
  }
}
