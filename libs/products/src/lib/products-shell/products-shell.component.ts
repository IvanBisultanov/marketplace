import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { Product } from '@ultra/models';
import { ProductsActions, ProductsSelectors } from '@ultra/shared/state';

import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'ultra-products-shell',
  standalone: true,
  imports: [CommonModule, ProductListComponent, MatButtonModule],
  templateUrl: './products-shell.component.html',
  styleUrls: ['./products-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsShellComponent implements OnInit {
  public products$: Observable<Product[]> = this.store.pipe(
    select(ProductsSelectors.selectAllProducts),
    map((products) => products.sort((a, b) => a.title.localeCompare(b.title)))
  );
  public selectedIds$: Observable<Record<string, true>> = this.store.pipe(
    select(ProductsSelectors.selectSelectedProductIds),
    map((ids: Array<Product['id']>) => ids.reduce((acc, id) => ({ ...acc, [id]: true }), {}))
  );
  public productsError$: Observable<boolean | null | undefined> = this.store.pipe(
    select(ProductsSelectors.selectProductsError)
  );
  public productsPending$: Observable<boolean> = this.store.pipe(
    select(ProductsSelectors.selectProductsPending)
  );

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.loadProducts();
  }

  public loadProducts(): void {
    this.store.dispatch(ProductsActions.loadProducts());
  }

  public selectProduct(product: Product): void {
    this.store.dispatch(ProductsActions.addProduct({ product }));
  }
}
