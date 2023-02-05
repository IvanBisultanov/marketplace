import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY, productsAdapter, ProductsState } from './products.reducer';
import { Product } from '@ultra/models';
import { Dictionary } from '@ngrx/entity';

export const selectProductsState = createFeatureSelector<ProductsState>(PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = productsAdapter.getSelectors();

const selectProductsLoaded = createSelector(
  selectProductsState,
  (state: ProductsState) => state.loaded
);

const selectProductsPending = createSelector(
  selectProductsState,
  (state: ProductsState) => state.pending
);

const selectProductsError = createSelector(
  selectProductsState,
  (state: ProductsState) => state.error
);

const selectAllProducts = createSelector(selectProductsState, selectAll);

const selectProductsEntities = createSelector(selectProductsState, selectEntities);

const selectSelectedProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.selectedProducts
);

const selectSelectedProductsPending = createSelector(
  selectSelectedProducts,
  (selectedProducts) => selectedProducts.pending
);

const selectSelectedProductIds = createSelector(
  selectSelectedProducts,
  (selectedProducts) => selectedProducts.ids
);

const selectSelectedProductEntities = createSelector(
  selectProductsEntities,
  selectSelectedProductIds,
  (entities: Dictionary<Product>, selectedIds) => selectedIds.map((id) => entities[id] as Product)
);

export const ProductsSelectors = {
  selectProductsLoaded,
  selectProductsError,
  selectProductsPending,
  selectAllProducts,
  selectProductsEntities,
  selectSelectedProducts,
  selectSelectedProductsPending,
  selectSelectedProductIds,
  selectSelectedProductEntities,
};
