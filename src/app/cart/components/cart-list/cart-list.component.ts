import { Component, OnInit, OnDestroy } from '@angular/core';

// RxJs
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {
  items: CartItem[];
  cartTotalSum: number;
  cartTotalCount: number;
  private sub: Subscription = new Subscription();

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.sub.add(this.cartService
        .getSum()
        .subscribe(sum => (this.cartTotalSum = sum)));
    this.sub.add(this.cartService
        .getCount()
        .subscribe(count => (this.cartTotalCount = count)));
    this.updateView();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  emptyCart() {
    this.cartService.emptyCart();
    this.updateView();
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.changeCount(item);
  }

  changeCount(item: CartItem) {
    this.cartService.changeCount(item);
    this.updateView();
  }

  private updateView() {
    this.items = this.cartService.getItems();
  }
}
