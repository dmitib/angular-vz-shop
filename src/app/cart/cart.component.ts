import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService } from './services';
import { CartItem } from './models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  items: CartItem[];
  cartSum: number;

  constructor(private service: CartService) {}

  ngOnInit() {
    this.items = this.service.getItems();
    this.service.getSum()
      .subscribe(sum => this.cartSum = sum);
  }

  ngOnDestroy() {
    this.service.getSum().unsubscribe();
  }

  emptyCart() {
    this.service.emptyCart();
    this.items = this.service.getItems();
  }

  removeItem(item: CartItem) {
    this.service.removeItem(item);
    this.items = this.service.getItems();
  }

}
