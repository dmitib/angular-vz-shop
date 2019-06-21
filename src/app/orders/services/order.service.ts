import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
  private orders: Order[] = [];

  constructor() { }

  addOrder(order: Order): Order {
    const id =
      this.orders.length > 0
        ? this.orders
          .map(p => p.id)
          .reduce((prev, cur) => {
            return prev < cur ? cur : prev;
          })
        : 0;
    const savedOrder = { ...order, id: id + 1 };
    this.orders.push(savedOrder);
    return savedOrder;
  }

  getOrders(): Order[] {
    return this.orders;
  }

  getOrder(id: number): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  deleteOrder(id: number): Order | null {
    const orderIndex = this.orders.findIndex(o => o.id === id);
    if (orderIndex > -1) {
      const order = this.orders[orderIndex];
      this.orders.splice(orderIndex, 1);
      return order;
    } else {
      return null;
    }
  }

  editOrder(order: Order): Order {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index === -1) {
      throw new Error('No order found');
    }

    this.orders[index] = {...order};
    return order;
  }
}
