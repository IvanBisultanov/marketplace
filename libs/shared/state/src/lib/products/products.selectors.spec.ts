import { Product } from '@ultra/models';

import { initialProductsState, productsAdapter, ProductsPartialState } from './products.reducer';
import { ProductsSelectors } from './products.selectors';

describe('Products Selectors', () => {
  const getProductsId = (it: Product) => it.id;
  const createProductsEntity = (id: string, title = ''): Product => ({
    id,
    title: title || `title-${id}`,
    img: 'string',
    price: {
      value: 100,
      currency: '€',
    },
    available: true,
  });

  let state: ProductsPartialState;

  beforeEach(() => {
    state = {
      products: productsAdapter.setAll(
        [
          createProductsEntity('PRODUCT-AAA'),
          createProductsEntity('PRODUCT-BBB'),
          createProductsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialProductsState,
          error: true,
          loaded: true,
        }
      ),
    };
  });

  describe('Products Selectors', () => {
    it('selectAllProducts() should return the list of Products', () => {
      const results = ProductsSelectors.selectAllProducts(state);
      const selId = getProductsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectProductsLoaded() should return the current "loaded" status', () => {
      const result = ProductsSelectors.selectProductsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectProductsError() should return the current "error" state', () => {
      const result = ProductsSelectors.selectProductsError(state);

      expect(result).toBe(true);
    });
  });
});
