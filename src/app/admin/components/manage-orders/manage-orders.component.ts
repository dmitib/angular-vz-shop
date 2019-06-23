import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Order } from '../../../orders/models/order.model';
import { OrderService } from '../../../orders/services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {
  orders$: Observable<Order[]>;

  private deleteSub: Subscription;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.initOrders();
  }

  ngOnDestroy() {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

  onDelete(order: Order) {
    this.deleteSub = this.orderService
      .deleteOrder(order.id)
      .subscribe(() => this.initOrders());
  }

  private initOrders() {
    this.orders$ = this.orderService.getOrders();
  }
}
