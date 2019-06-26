import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { ProductModel } from '../../../products/models/product.model';

export interface ProductsState extends EntityState<ProductModel> {
  selectedProduct: ProductModel;
  loading: boolean;
  loaded: boolean;
  editComplete: boolean;
  error: Error | string;
}

export const productsAdapter: EntityAdapter<ProductModel> = createEntityAdapter<
  ProductModel
>();

export const initialProductsState: ProductsState = productsAdapter.getInitialState(
  {
    selectedProduct: null,
    loading: false,
    loaded: false,
    editComplete: false,
    error: null
  }
);
