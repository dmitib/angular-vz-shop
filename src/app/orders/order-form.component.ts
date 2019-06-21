import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Order } from '../orders/models/order.model';
import { CartService } from '../cart/services/cart.service';
import { PopupService } from '../core/services/popup.services';
import { OrderService } from '../orders/services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  order: Order;
  private sub: Subscription = new Subscription();
  cartTotalSum: number;

  constructor(
    private cartService: CartService,
    private popupService: PopupService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const cartItems = this.cartService.getItems().filter(item => item.count > 0);

    this.order = {
      id: 0,
      cartItems,
      name: '',
      date: new Date(),
      deliveryAddress: ''
    };

    this.sub.add(this.cartService
      .getSum()
      .subscribe(sum => (this.cartTotalSum = sum)));
  }

  onProcessOrder() {
    this.orderService.addOrder(this.order);
    this.cartService.emptyCart();
    this.router.navigate(['/products-list']);
  }

  cancelOrder() {
    this.popupService.confirm('Are you really want to cancel order?').then(
      result => {
        if (result) {
          this.cartService.emptyCart();
          this.router.navigate(['/products-list']);
        }
      }
    );
  }
}
