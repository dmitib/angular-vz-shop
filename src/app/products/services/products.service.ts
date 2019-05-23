import { Injectable } from '@angular/core';

import { ProductModel } from '../models/product.model';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): Array<ProductModel> {
    return [
      {
        category: Category.category1,
        description: 'product-1-description',
        isAvailable: true,
        name: 'product-1-name',
        price: 100
      },
      {
        category: Category.category2,
        description: 'product-2-description',
        isAvailable: false,
        name: 'product-2-name',
        price: 200
      },
      {
        category: Category.category3,
        description: 'product-3-description',
        isAvailable: true,
        name: 'product-3-name',
        price: 300
      },
      {
        category: Category.category4,
        description: 'product-4-description',
        isAvailable: false,
        name: 'product-4-name',
        price: 400
      },
      {
        category: Category.category5,
        description: 'product-5-description',
        isAvailable: true,
        name: 'product-5-name',
        price: 500
      },
      {
        category: Category.category6,
        description: 'product-6-description',
        isAvailable: false,
        name: 'product-6-name',
        price: 600
      }
    ];
  }
}
