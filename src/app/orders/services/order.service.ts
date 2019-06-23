import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { JsonServerClientService } from 'src/app/core/services/json-server-client.service';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
  private readonly endpoint = `orders`;

  constructor(private jsonServerClient: JsonServerClientService) {}

  addOrder(order: Order): Observable<Order> {
    return this.getOrders().pipe(
      concatMap(orders => {
        const maxId = orders
          .map(o => o.id)
          .reduce((prev, cur) => Math.max(prev, cur));
        const orderToAdd: Order = {
          ...order,
          id: maxId + 1
        };

        return this.jsonServerClient
          .post<Order>(this.endpoint, orderToAdd)
          .pipe(catchError(this.handleError));
      })
    );
  }

  editOrder(order: Order): Observable<Order> {
    const updateUrl = `${this.endpoint}/${order.id}`;

    return this.jsonServerClient
      .put<Order>(updateUrl, order)
      .pipe(catchError(this.handleError));
  }

  getOrders(): Observable<Order[]> {
    return this.jsonServerClient.get<Order[]>(this.endpoint).pipe(catchError(this.handleError));
  }

  getOrder(id: number): Observable<Order> {
    const getUrl = this.endpoint + '/' + id;
    return this.jsonServerClient.get<Order>(getUrl).pipe(catchError(this.handleError));
  }

  deleteOrder(id: number): Observable<{}> {
    const deleteUrl = this.endpoint + '/' + id;
    return this.jsonServerClient.delete(deleteUrl).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${
        err.error
      }`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
