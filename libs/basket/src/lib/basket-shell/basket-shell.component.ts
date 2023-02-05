import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, Observable, ReplaySubject, takeUntil } from 'rxjs';

import { TotalBasketValueComponent } from '@ultra/components';
import { Deposit, Product } from '@ultra/models';
import { TotalPricePipe } from '@ultra/pipes';
import { ProductsActions, ProductsSelectors, WealthSelectors } from '@ultra/shared/state';

import { BasketListComponent } from '../basket-list/basket-list.component';

@Component({
  selector: 'ultra-basket-shell',
  standalone: true,
  imports: [
    BasketListComponent,
    CommonModule,
    MatButtonModule,
    RouterLink,
    TotalBasketValueComponent,
    TotalPricePipe,
  ],
  templateUrl: './basket-shell.component.html',
  styleUrls: ['./basket-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketShellComponent implements OnDestroy {
  public deposit$: Observable<Deposit> = this.store.pipe(
    select(WealthSelectors.selectWealthDeposit)
  );
  public selectedProducts$: Observable<Product[]> = this.store.pipe(
    select(ProductsSelectors.selectSelectedProductEntities)
  );
  public selectedProductsPending$: Observable<boolean> = this.store.pipe(
    select(ProductsSelectors.selectSelectedProductsPending)
  );
  private destroyed$: ReplaySubject<void> = new ReplaySubject(1);

  constructor(private readonly router: Router, private readonly store: Store) {
    this.store
      .pipe(
        select(ProductsSelectors.selectSelectedProducts),
        takeUntil(this.destroyed$),
        filter((res) => res.loaded && res.ids.length === 0)
      )
      .subscribe(() => this.router.navigate(['/']));
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public removeFromBasket(product: Product): void {
    this.store.dispatch(ProductsActions.deleteProduct({ product }));
  }
}
