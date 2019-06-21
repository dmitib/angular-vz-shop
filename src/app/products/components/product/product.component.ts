import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
  @Input() product: ProductModel;

  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
  @Output() seeDetails = new EventEmitter<ProductModel>();

  ngOnInit() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  lastTimeAction() {
    return new Date();
  }

  onSeeDetails() {
    this.seeDetails.emit(this.product);
  }
}
