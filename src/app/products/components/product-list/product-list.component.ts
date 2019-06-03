import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { CartService } from '../../../cart/services/cart.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: ProductModel[];
  cartSum: number;
  cartCount: number;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();
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
}
