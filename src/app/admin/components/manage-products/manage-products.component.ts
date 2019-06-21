import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../../../products/models/product.model';
import { ProductsService } from '../../../products/services';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
  products: ProductModel[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.initProducts();
  }

  async onDelete(product: ProductModel) {
    await this.productsService.deleteProduct(product.id);
    this.initProducts();
  }

  private async initProducts() {
    this.products = await this.productsService.getProducts();
  }
}
