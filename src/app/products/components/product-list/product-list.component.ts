import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';

import { CartService } from '../../../cart/services/cart.service';
import { ProductModel } from '../../models/product.model';
import { AppState } from '../../../core/state/app.state';
import * as act from '../../../core/state/products/products.actions';
import { getProducts, getProductsLoading } from '../../../core/state/products/products.selectors';
import { Go } from '../../../core/state/router/router.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  cartSum: number;
  cartCount: number;
  isLoading = true;
  isEmpty = false;
  products$: Observable<ProductModel[]>;
  loading$: Observable<boolean>;

  constructor(
    private cartService: CartService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.products$ = this.store.pipe(select(getProducts));
    this.loading$ = this.store.pipe(select(getProductsLoading));
    this.store.dispatch(new act.GetProducts());
  }

  onAddToCart(product: ProductModel) {
    this.cartService.addToCart({
      name: product.name,
      description: product.description,
      price: product.price,
      count: 1
    });

    this.cartSum = this.cartService.getCartSum();
    this.cartService.setSum(this.cartSum);

    this.cartCount = this.cartService.getCartCount();
    this.cartService.setCount(this.cartCount);
  }

  onSeeDetails(product: ProductModel) {
    const link = ['/product', product.id];
    this.store.dispatch(new Go({ path: link }));
  }
}
