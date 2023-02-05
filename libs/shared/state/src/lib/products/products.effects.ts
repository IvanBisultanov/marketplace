import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { ProductApiService } from '@ultra/api';
import { ErrorMessages } from '@ultra/models';

import { ProductsActions } from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productApi = inject(ProductApiService);
  private snackBar = inject(MatSnackBar);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.productApi.fetchProducts$().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError(() => {
            this.snackBar.open(ErrorMessages.default, undefined, { duration: 2500 });
            // log in sentry or other similar tool
            return of(ProductsActions.loadProductsError());
          })
        )
      )
    )
  );

  loadSelectedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadSelectedProducts),
      switchMap(() =>
        this.productApi.fetchSelectedProducts$().pipe(
          map((products) => ProductsActions.loadSelectedProductsSuccess({ products })),
          catchError(() => {
            this.snackBar.open(ErrorMessages.default, undefined, { duration: 2500 });
            // log in sentry or other similar tool
            return of(ProductsActions.loadSelectedProductsError());
          })
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.addProduct),
      mergeMap(({ product }) =>
        this.productApi.addProduct$(product.id).pipe(
          map(() => ProductsActions.addProductSuccess({ product })),
          catchError(() => {
            this.snackBar.open(ErrorMessages.default, undefined, { duration: 2500 });
            // log in sentry or other similar tool
            return of(ProductsActions.addProductError({ product }));
          })
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.deleteProduct),
      mergeMap(({ product }) =>
        this.productApi.deleteProduct$(product.id).pipe(
          map(() => ProductsActions.deleteProductSuccess({ product })),
          catchError(() => {
            this.snackBar.open(ErrorMessages.default, undefined, { duration: 2500 });
            // log in sentry or other similar tool
            return of(ProductsActions.deleteProductError({ product }));
          })
        )
      )
    )
  );
}
