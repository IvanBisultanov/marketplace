import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  ProductsEffects,
  productsReducer,
  WealthEffects,
  wealthReducer,
} from '@ultra/shared/state';

import { shellRoutes } from './shell.routes';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatSnackBarModule,
    RouterModule.forRoot(shellRoutes),
    StoreModule.forRoot(
      {
        products: productsReducer,
        wealth: wealthReducer,
      },
      {
        metaReducers: [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 50 }),
    EffectsModule.forRoot([WealthEffects, ProductsEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class ShellModule {}
