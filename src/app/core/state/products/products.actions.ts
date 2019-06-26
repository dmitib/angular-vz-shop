import { Action } from '@ngrx/store';
import { ProductModel } from '../../../products/models/product.model';

export const GET_PRODUCTS = '[Products] - Get products';
export const GET_PRODUCTS_SUCCESS = '[Products] - Get products success';
export const GET_PRODUCTS_ERROR = '[Products] - Get products error';
export const GET_PRODUCT = '[Products] - Get product';
export const GET_PRODUCT_SUCCESS = '[Products] - Get product success';
export const GET_PRODUCT_ERROR = '[Products] - Get product error';
export const GET_PRODUCT_FROM_URL = '[Products] - Get product from url';
export const ADD_PRODUCT = '[Products] - Add product';
export const ADD_PRODUCT_SUCCESS = '[Products] - Add product success';
export const ADD_PRODUCT_ERROR = '[Products] - Add product error';
export const EDIT_PRODUCT = '[Products] - Edit product';
export const EDIT_PRODUCT_SUCCESS = '[Products] - Edit product success';
export const EDIT_PRODUCT_ERROR = '[Products] - Edit product error';
export const DELETE_PRODUCT = '[Products] - Delete product';
export const DELETE_PRODUCT_SUCCESS = '[Products] - Delete product success';
export const DELETE_PRODUCT_ERROR = '[Products] - Delete product error';

export class GetProducts implements Action {
  readonly type = GET_PRODUCTS;
}

export class GetProductsSuccess implements Action {
  readonly type = GET_PRODUCTS_SUCCESS;
  constructor(public payload: ProductModel[]) {}
}

export class GetProductsError implements Action {
  readonly type = GET_PRODUCTS_ERROR;
  constructor(public payload: Error | string) {}
}

export class GetProduct implements Action {
  readonly type = GET_PRODUCT;
  constructor(public payload: number) {}
}

export class GetProductSuccess implements Action {
  readonly type = GET_PRODUCT_SUCCESS;
  constructor(public payload: ProductModel) {}
}

export class GetProductError implements Action {
  readonly type = GET_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class GetProductFromUrl implements Action {
  readonly type = GET_PRODUCT_FROM_URL;
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;
  constructor(public payload: ProductModel) {}
}

export class AddProductSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;
  constructor(public payload: ProductModel) {}
}

export class AddProductError implements Action {
  readonly type = ADD_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class EditProduct implements Action {
  readonly type = EDIT_PRODUCT;
  constructor(public payload: ProductModel) {}
}

export class EditProductSuccess implements Action {
  readonly type = EDIT_PRODUCT_SUCCESS;
  constructor(public payload: ProductModel) {}
}

export class EditProductError implements Action {
  readonly type = EDIT_PRODUCT_ERROR;
  constructor(public payload: Error) {}
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;
  constructor(public payload: number) {}
}

export class DeleteProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteProductError implements Action {
  readonly type = DELETE_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export type ProductsActions =
  | GetProducts
  | GetProductsSuccess
  | GetProductsError
  | GetProduct
  | GetProductSuccess
  | GetProductError
  | GetProductFromUrl
  | AddProduct
  | AddProductSuccess
  | AddProductError
  | EditProduct
  | EditProductSuccess
  | EditProductError
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductError;
