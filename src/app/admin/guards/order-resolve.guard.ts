import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Order } from '../../orders/models/order.model';
import { OrderService } from '../../orders/services/order.service';

@Injectable()
export class OrderResolveGuard implements Resolve<Order> {
  constructor(private orderService: OrderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Order {
    if (!route.paramMap.has('orderID')) {
      return {
        cartItems: [],
        date: new Date(),
        deliveryAddress: '',
        id: 0,
        name: ''
      };
    }

    const id = +route.paramMap.get('orderID');
    const order = this.orderService.getOrder(id);
    if (!order) {
      this.router.navigate(['/admin/orders']);
    }

    return order;
  }
}
