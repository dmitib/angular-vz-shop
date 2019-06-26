import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Order, DeliveryType } from '../../orders/models/order.model';
import { OrderService } from '../../orders/services/order.service';
import { AppState } from '../../core/state/app.state';
import { Go } from '../../core/state/router/router.actions';
import { getIsoDate } from '../../core/helpers/date.helper';

@Injectable()
export class OrderResolveGuard implements Resolve<Order> {
  constructor(
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    if (!route.paramMap.has('orderID')) {
      return of({
        cartItems: [],
        date: getIsoDate(new Date()),
        deliveryAddress: '',
        id: 0,
        name: '',
        phones: [],
        deliveryType: DeliveryType.byAddress
      });
    }

    const id = +route.paramMap.get('orderID');
    return this.orderService.getOrder(id).pipe(
      map(order => {
        if (order) {
          return order;
        }

        this.store.dispatch(new Go({ path: ['/admin/orders'] }));
        return null;
      }),
      take(1),
      catchError(() => {
        this.store.dispatch(new Go({ path: ['/admin/orders'] }));
        return of(null);
      })
    );
  }
}
