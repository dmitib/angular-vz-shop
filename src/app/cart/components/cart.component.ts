import { Component, OnInit } from '@angular/core';

import { CartService } from '../services/cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  items: CartItem[];
  cartSum: number;

  constructor(private service: CartService) {}

  ngOnInit() {
    this.items = this.service.getItems();
    // желательно  сохранить подписку и затем ее убрать
    this.service.getSum()
      .subscribe(sum => this.cartSum = sum);
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
