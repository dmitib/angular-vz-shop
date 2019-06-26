import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState, productsAdapter } from './products.state';

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);

const { selectAll } = productsAdapter.getSelectors(
  getProductsState
);

export const getProducts = selectAll;

export const getSelectedProduct = createSelector(
  getProductsState,
  state => state.selectedProduct
);

export const getProductsLoading = createSelector(
  getProductsState,
  state => state.loading
);

export const getProductEditComplete = createSelector(
  getProductsState,
  state => state.editComplete
);
