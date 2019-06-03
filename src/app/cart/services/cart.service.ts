import { Injectable } from '@angular/core';

// rxjs
import { BehaviorSubject } from 'rxjs';

import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];

  cartSum$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartCount$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  getItems(): CartItem[] {
    return this.items;
  }

  setSum(sum: number) {
    this.cartSum$.next(sum);
  }

  getSum() {
    return this.cartSum$;
  }

  getCartSum(): number {
    return this.items.reduce((sum, item) => sum += item.price * item.count, 0);
  }

  addToCart(item: CartItem) {
    const cartItem = this.items.find(i => i.name === item.name);
    if (!cartItem) {
      this.items.push(item);
    } else {
      cartItem.count += item.count;
    }
  }

  emptyCart() {
    this.items = [];
  }

  changeCount(item: CartItem) {
    const cartItemIndex = this.items.findIndex(i => i.name === item.name);

    if (cartItemIndex !== -1) {
      this.items[cartItemIndex].count = item.count;
    }

    this.setSum(this.getCartSum());
    this.setCount(this.getCartCount());
  }

  removeItem(item: CartItem) {
    const cartItemIndex = this.items.findIndex(i => i.name === item.name);

    if (cartItemIndex !== -1) {
      this.items.splice(cartItemIndex, 1);
    }
  }

  setCount(count: number) {
    this.cartCount$.next(count);
  }

  getCount() {
    return this.cartCount$;
  }

  getCartCount(): number {
    return this.items.reduce((count, item) => count += item.count, 0);
  }
}
