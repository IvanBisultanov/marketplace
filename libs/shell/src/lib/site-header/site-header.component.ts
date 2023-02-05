import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Deposit, Product } from '@ultra/models';
import { ProductsSelectors, WealthSelectors } from '@ultra/shared/state';

@Component({
  selector: 'ultra-site-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteHeaderComponent {
  public deposit$: Observable<Deposit> = this.store.pipe(
    select(WealthSelectors.selectWealthDeposit)
  );
  public selectedProductIds$: Observable<Array<Product['id']>> = this.store.pipe(
    select(ProductsSelectors.selectSelectedProductIds)
  );
  constructor(private readonly store: Store) {}
}
