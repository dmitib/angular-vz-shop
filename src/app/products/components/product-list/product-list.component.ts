import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { CartService } from '../../../cart/services/cart.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Promise<ProductModel[]>;
  cartSum: number;
  cartCount: number;
  isLoading = true;
  isEmpty = false;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.products.finally(() => this.isLoading = false);
    this.products.then(products => products.length ? products : this.isEmpty = true);
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
