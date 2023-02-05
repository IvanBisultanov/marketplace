import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { Product } from '@ultra/models';

import { ProductsActions } from './products.actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductsState extends EntityState<Product> {
  selectedProducts: {
    ids: string[];
    pending: boolean;
    loaded: boolean;
    error: boolean;
  };
  pending: boolean;
  loaded: boolean;
  error: boolean;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductsState;
}

export const productsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialProductsState: ProductsState = productsAdapter.getInitialState({
  selectedProducts: {
    ids: [],
    loaded: false,
    pending: false,
    error: false,
  },
  loaded: false,
  pending: false,
  error: false,
});

const reducer = createReducer(
  initialProductsState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    pending: true,
    loaded: false,
    error: false,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) =>
    productsAdapter.upsertMany(products, { ...state, loaded: true, pending: false })
  ),
  on(ProductsActions.loadProductsError, (state) => ({
    ...state,
    error: true,
    loaded: false,
    pending: false,
  })),

  on(ProductsActions.loadSelectedProducts, (state) => ({
    ...state,
    selectedProducts: {
      ...state.selectedProducts,
      pending: true,
      loaded: false,
      error: false,
    },
  })),
  on(ProductsActions.loadSelectedProductsSuccess, (state, { products }) => ({
    ...productsAdapter.upsertMany(products, {
      ...state,
    }),
    selectedProducts: {
      ids: products.map((product) => product.id),
      loaded: true,
      pending: false,
      error: false,
    },
  })),
  on(ProductsActions.loadSelectedProductsError, (state) => ({
    ...state,
    selectedProducts: {
      ...state.selectedProducts,
      error: true,
      loaded: false,
      pending: false,
    },
  })),

  on(ProductsActions.resetProducts, (state) => ({
    ...state,
    ...productsAdapter.setAll([], {
      ...state,
      loaded: true,
      pending: false,
    }),
  })),

  on(ProductsActions.resetSelectedProducts, (state) => ({
    ...state,
    selectedProducts: {
      ids: [],
      loaded: true,
      pending: false,
      error: false,
    },
  })),

  on(ProductsActions.addProduct, (state, { product }) => ({
    ...productsAdapter.updateOne(
      {
        id: product.id,
        changes: { pending: true, error: false },
      },
      state
    ),
    selectedProducts: {
      ...state.selectedProducts,
      pending: true,
    },
  })),
  on(ProductsActions.addProductSuccess, (state, { product }) => ({
    ...productsAdapter.updateOne(
      {
        id: product.id,
        changes: { pending: false },
      },
      state
    ),
    selectedProducts: {
      ...state.selectedProducts,
      ids: [...state.selectedProducts.ids, product.id],
      pending: false,
    },
  })),
  on(ProductsActions.addProductError, (state, { product }) => ({
    ...productsAdapter.updateOne(
      {
        id: product.id,
        changes: { pending: false, error: true },
      },
      state
    ),
    selectedProducts: {
      ...state.selectedProducts,
      pending: false,
    },
  })),

  on(ProductsActions.deleteProduct, (state, { product }) => ({
    ...productsAdapter.updateOne(
      {
        id: product.id,
        changes: { pending: true, error: false },
      },
      state
    ),
    selectedProducts: {
      ...state.selectedProducts,
      pending: true,
    },
  })),
  on(ProductsActions.deleteProductSuccess, (state, { product }) => ({
    ...productsAdapter.updateOne(
      {
        id: product.id,
        changes: { pending: false },
      },
      state
    ),
    selectedProducts: {
      ...state.selectedProducts,
      ids: state.selectedProducts.ids.filter((selectedId) => selectedId !== product.id),
      pending: false,
    },
  })),
  on(ProductsActions.deleteProductError, (state, { product }) => ({
    ...productsAdapter.updateOne(
      {
        id: product.id,
        changes: { pending: false, error: true },
      },
      state
    ),
    selectedProducts: {
      ...state.selectedProducts,
      pending: false,
    },
  }))
);

export function productsReducer(state: ProductsState | undefined, action: Action) {
  return reducer(state, action);
}
