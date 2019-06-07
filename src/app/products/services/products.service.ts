import { Injectable } from '@angular/core';

import { ProductModel } from '../models/product.model';

const products: ProductModel[] = [
  {
    category: 'category-1',
    description: 'product-1-description',
    isAvailable: true,
    name: 'product-1-name',
    price: 100.4
  },
  {
    category: 'category-2',
    description: 'product-2-description',
    isAvailable: false,
    name: 'product-2-name',
    price: 200.6
  },
  {
    category: 'category-3',
    description: 'product-3-description',
    isAvailable: true,
    name: 'product-3-name',
    price: 300.8
  },
  {
    category: 'category-4',
    description: 'product-4-description',
    isAvailable: false,
    name: 'product-4-name',
    price: 400.9
  },
  {
    category: 'category-5',
    description: 'product-5-description',
    isAvailable: true,
    name: 'product-5-name',
    price: 500.38
  },
  {
    category: 'category-6',
    description: 'product-6-description',
    isAvailable: false,
    name: 'product-6-name',
    price: 600.98
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): Promise<ProductModel[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(products), 2000);
    });
  }
}
