import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';

import { Order } from '../orders/models/order.model';
import { CartService } from '../cart/services/cart.service';
import { PopupService } from '../core/services/popup.services';
import { OrderService } from '../orders/services/order.service';
import { AutoUnsubscribe } from '../core/decorators';
import { AppState } from '../core/state/app.state';
import { Go } from '../core/state/router/router.actions';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
@AutoUnsubscribe()
export class OrderFormComponent implements OnInit {
  order: Order;
  cartTotalSum: number;

  private sub: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private popupService: PopupService,
    private store: Store<AppState>,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const cartItems = this.cartService.getItems().filter(item => item.count > 0);

    this.order = {
      id: 0,
      cartItems,
      name: '',
      date: new Date().toISOString(),
      deliveryAddress: ''
    };

    this.sub.add(this.cartService
      .getSum()
      .subscribe(sum => (this.cartTotalSum = sum)));
  }

  onProcessOrder() {
    this.orderService.addOrder(this.order).subscribe(() => {
      this.cartService.emptyCart();
      this.store.dispatch(new Go({ path: ['/products-list'] }));
    });
  }

  cancelOrder() {
    this.popupService.confirm('Are you really want to cancel order?').then(
      result => {
        if (result) {
          this.cartService.emptyCart();
          this.store.dispatch(new Go({ path: ['/products-list'] }));
        }
      }
    );
  }
}
