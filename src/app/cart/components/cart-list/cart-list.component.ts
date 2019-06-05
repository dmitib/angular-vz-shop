import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

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

  // Можно создать одну подписку, а следующие добавлять как дочерние
  // this.sub.add(anotherSub)
  private getSumSubscribe: Subscription;
  private getCountSubscribe: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getSumSubscribe = this.cartService
      .getSum()
      .subscribe(sum => (this.cartTotalSum = sum));
    this.getCountSubscribe = this.cartService
      .getCount()
      .subscribe(count => (this.cartTotalCount = count));

    this.updateView();
  }

  ngOnDestroy() {
    // Можно отписаться только от основной, дочерние автоматически отпишутся
    // thi.sub.unsibscribe();
    this.getSumSubscribe.unsubscribe();
    this.getCountSubscribe.unsubscribe();
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
