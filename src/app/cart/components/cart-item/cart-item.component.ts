import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { CartItem } from '../../models/cart-item.model';

@Component({
  /* tslint:disable */
  selector: '[app-cart-item]',
  /* tslint:enable */
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  private newCount: number;

  @Input() item: CartItem;

  @Output() itemRemove = new EventEmitter<CartItem>();
  @Output() changeCount = new EventEmitter<CartItem>();

  ngOnInit() {}

  onRemoveItem(item: CartItem) {
    this.itemRemove.emit(item);
  }

  onChangeCount(count: number) {
    this.newCount = this.item.count + count;

    if (this.newCount >= 0) {
      this.changeCount.emit({
        ...this.item,
        count: this.newCount
      });
    }
  }
}
