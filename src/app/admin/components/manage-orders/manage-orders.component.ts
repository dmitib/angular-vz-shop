import { Component, OnInit } from '@angular/core';

import { Order } from '../../../orders/models/order.model';
import { OrderService } from '../../../orders/services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.initOrders();
  }

  onDelete(order: Order) {
    this.orderService.deleteOrder(order.id);
    this.initOrders();
  }

  private initOrders() {
    this.orders = this.orderService.getOrders();
  }
}
