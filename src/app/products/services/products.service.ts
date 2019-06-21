import { Injectable } from '@angular/core';

import { ProductModel } from '../models/product.model';

const products: ProductModel[] = [
  {
    id: 1,
    category: 'category-1',
    description: 'product-1-description',
    isAvailable: true,
    name: 'product-1-name',
    price: 100.4
  },
  {
    id: 2,
    category: 'category-2',
    description: 'product-2-description',
    isAvailable: false,
    name: 'product-2-name',
    price: 200.6
  },
  {
    id: 3,
    category: 'category-3',
    description: 'product-3-description',
    isAvailable: true,
    name: 'product-3-name',
    price: 300.8
  },
  {
    id: 4,
    category: 'category-4',
    description: 'product-4-description',
    isAvailable: false,
    name: 'product-4-name',
    price: 400.9
  },
  {
    id: 5,
    category: 'category-5',
    description: 'product-5-description',
    isAvailable: true,
    name: 'product-5-name',
    price: 500.38
  },
  {
    id: 6,
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
      setTimeout(() => resolve(products), 500);
    });
  }

  getProduct(id: number): Promise<ProductModel> {
    return new Promise(resolve => {
      setTimeout(() => {
        const product = products.find(p => p.id === id);
        resolve(product);
      }, 500);
    });
  }

  addProduct(product: ProductModel): Promise<ProductModel> {
    return new Promise(resolve => {
      setTimeout(() => {
        const id = products
          .map(p => p.id)
          .reduce((prev, cur) => {
            return prev < cur ? cur : prev;
          });
        const savedProduct = { ...product, id: id + 1, updateDate: new Date() };
        products.push(savedProduct);
        resolve(savedProduct);
      });
    });
  }

  editProduct(product: ProductModel): Promise<ProductModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex(p => p.id === product.id);
        if (productIndex > -1) {
          products[productIndex] = { ...product };
          resolve(product);
        } else {
          reject('not found');
        }
      });
    });
  }

   deleteProduct(id: number): Promise<ProductModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex > -1) {
          const product = products[productIndex];
          products.splice(productIndex, 1);
          resolve(product);
        } else {
          reject('not found');
        }
      });
    });
  }
}
