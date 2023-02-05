import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { WealthApiService } from '@ultra/api';
import { ErrorMessages } from '@ultra/models';

import { WealthActions } from './wealth.actions';

@Injectable()
export class WealthEffects {
  private actions$ = inject(Actions);
  private snackBar = inject(MatSnackBar);
  private wealthApi = inject(WealthApiService);

  loadDeposit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WealthActions.loadDeposit),
      switchMap(() =>
        this.wealthApi.fetchDeposit$().pipe(
          map((deposit) => WealthActions.loadDepositSuccess({ deposit })),
          catchError(() => {
            this.snackBar.open(ErrorMessages.default, undefined, { duration: 2500 });
            // log in sentry or other similar tool
            return of(WealthActions.loadDepositError());
          })
        )
      )
    )
  );

  checkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WealthActions.checkout),
      switchMap(({ checkoutForm }) =>
        this.wealthApi.checkout$(checkoutForm).pipe(
          map((checkoutResponse) => WealthActions.checkoutResponse({ checkoutResponse })),
          catchError(() => {
            this.snackBar.open(ErrorMessages.default, undefined, { duration: 2500 });
            // log in sentry or other similar tool
            return of(WealthActions.checkoutError());
          })
        )
      )
    )
  );
}
