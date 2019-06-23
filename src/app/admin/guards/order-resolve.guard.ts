import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { Order } from 'src/app/orders/models/order.model';
import { OrderService } from 'src/app/orders/services/order.service';

@Injectable()
export class OrderResolveGuard implements Resolve<Order> {
  constructor(private orderService: OrderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    if (!route.paramMap.has('orderID')) {
      return of({
        cartItems: [],
        date: new Date().toISOString(),
        deliveryAddress: '',
        id: 0,
        name: ''
      });
    }

    const id = +route.paramMap.get('orderID');
    return this.orderService.getOrder(id).pipe(
      map(order => {
        if (order) {
          return order;
        }

        this.router.navigate(['/admin/orders']);
        return null;
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/admin/orders']);
        return of(null);
      })
    );
  }
}
