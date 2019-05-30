import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {
  items: CartItem[];
  cartTotalSum: number;
  cartCount: number;
  cartSum: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.updateView();
  }

  ngOnDestroy() {
    this.cartService.getSum().unsubscribe();
  }

  emptyCart() {
    this.cartService.emptyCart();
    this.updateView();
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
    this.updateView();
  }

  changeCount(item: CartItem) {
    this.cartService.changeCount(item);
    this.cartService.changeCount(item);
    this.updateView();
  }

  private updateView() {
    this.items = this.cartService.getItems();
    this.cartTotalSum = this.cartService.getCartSum();
    this.cartService.getSum()
      .subscribe(sum => this.cartTotalSum = sum);
  }
}
