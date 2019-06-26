import {
  ProductsState,
  initialProductsState,
  productsAdapter
} from './products.state';
import * as act from './products.actions';

export function productsReducer(
  state: ProductsState = initialProductsState,
  action: act.ProductsActions
): ProductsState {
  switch (action.type) {
    case act.GET_PRODUCTS: {
      return {
        ...state,
        loading: true,
        editComplete: false,
        selectedProduct: null
      };
    }
    case act.GET_PRODUCTS_SUCCESS: {
      const data = [...action.payload];
      return productsAdapter.addAll(data, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case act.GET_PRODUCTS_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case act.GET_PRODUCT: {
      return {
        ...state,
        loading: true,
        editComplete: false
      };
    }
    case act.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        selectedProduct: action.payload
      };
    }
    case act.GET_PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
    }
    case act.ADD_PRODUCT: {
      return { ...state, editComplete: false };
    }
    case act.ADD_PRODUCT_SUCCESS: {
      const addItem = action.payload;
      return productsAdapter.addOne(addItem, { ...state, editComplete: true });
    }
    case act.ADD_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case act.EDIT_PRODUCT: {
      return {
        ...state,
        editComplete: false
      };
    }
    case act.EDIT_PRODUCT_SUCCESS: {
      const product = action.payload;
      return productsAdapter.updateOne(
        { id: product.id, changes: product },
        { ...state, selectedProduct: product, editComplete: true }
      );
    }
    case act.EDIT_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    case act.DELETE_PRODUCT: {
      return {
        ...state,
        editComplete: false
      };
    }
    case act.DELETE_PRODUCT_SUCCESS: {
      const deleteItemId = action.payload;
      return productsAdapter.removeOne(deleteItemId, {
        ...state,
        editComplete: true
      });
    }
    case act.DELETE_PRODUCT_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
