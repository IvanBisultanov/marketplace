import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { filter, Observable, ReplaySubject, takeUntil, tap } from 'rxjs';

import { CheckoutForm, CheckoutStatus, Deposit, Product } from '@ultra/models';
import {
  ProductsActions,
  ProductsSelectors,
  WealthActions,
  WealthSelectors,
} from '@ultra/shared/state';

import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { CheckoutSuccessComponent } from '../checkout-success/checkout-success.component';

@Component({
  selector: 'ultra-checkout-shell',
  standalone: true,
  imports: [CheckoutFormComponent, CheckoutSuccessComponent, CommonModule],
  templateUrl: './checkout-shell.component.html',
  styleUrls: ['./checkout-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutShellComponent implements OnDestroy, OnInit {
  public checkoutStatus$: Observable<CheckoutStatus> = this.store.pipe(
    select(WealthSelectors.selectWealthCheckout)
  );
  public deposit$: Observable<Deposit> = this.store.pipe(
    select(WealthSelectors.selectWealthDeposit)
  );
  public selectedProducts$: Observable<Product[]> = this.store.pipe(
    select(ProductsSelectors.selectSelectedProductEntities)
  );
  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  constructor(
    private readonly actions: Actions,
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.store
      .pipe(
        select(ProductsSelectors.selectSelectedProducts),
        takeUntil(this.destroyed$),
        filter((res) => res.loaded && res.ids.length === 0)
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  public checkout(checkoutForm: CheckoutForm): void {
    this.store.dispatch(WealthActions.checkout({ checkoutForm }));
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.store.dispatch(WealthActions.resetCheckout());
  }
  public ngOnInit(): void {
    this.actions
      .pipe(
        ofType(WealthActions.checkoutResponse),
        takeUntil(this.destroyed$),
        filter(({ checkoutResponse }) => checkoutResponse.success),
        tap(() => this.store.dispatch(ProductsActions.resetSelectedProducts())),
        tap(() => this.store.dispatch(ProductsActions.resetProducts()))
      )
      .subscribe();
  }
}
