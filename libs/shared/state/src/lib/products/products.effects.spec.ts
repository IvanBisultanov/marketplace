import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { TestColdObservable } from 'jasmine-marbles/src/test-observables';
import { Observable, of } from 'rxjs';

import { ProductApiService } from '@ultra/api';

import { ProductsActions } from './products.actions';
import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
  let effects: ProductsEffects;
  let productApiService: ProductApiService;
  let actions$: Observable<Action> = new Observable<Action>();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        {
          provide: ProductApiService,
          useValue: {
            fetchProducts$: jest.fn(),
          },
        },
        ProductsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ProductsEffects);
    productApiService = TestBed.inject(ProductApiService);
  });

  describe('loadProducts$', () => {
    it('should work', () => {
      const action: TypedAction<string> = ProductsActions.loadProducts();
      const result: TypedAction<string> = ProductsActions.loadProductsSuccess({ products: [] });

      actions$ = of(action);
      const response: TestColdObservable = cold('-a', { a: [] });
      const expected: TestColdObservable = cold('-b', { b: result });

      jest.spyOn(productApiService, 'fetchProducts$').mockReturnValue(response);

      expect(effects.loadProducts$).toBeObservable(expected);
    });
  });
});
