import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProductsActions, WealthActions } from '@ultra/shared/state';

import { SiteFooterComponent } from '../site-footer/site-footer.component';
import { SiteHeaderComponent } from '../site-header/site-header.component';

@Component({
  selector: 'ultra-shell',
  standalone: true,
  imports: [RouterOutlet, SiteFooterComponent, SiteHeaderComponent],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent implements OnInit {
  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(WealthActions.loadDeposit());
    this.store.dispatch(ProductsActions.loadSelectedProducts());
  }
}
