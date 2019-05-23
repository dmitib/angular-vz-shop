import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: ProductModel;
  @Output() addToCart: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  ngOnInit() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
