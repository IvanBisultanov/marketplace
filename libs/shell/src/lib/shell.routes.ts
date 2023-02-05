import { Route } from '@angular/router';
import { ShellComponent } from './shell/shell.component';

export const shellRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: async () => (await import('@ultra/products')).ProductsModule,
      },
      {
        path: 'basket',
        loadChildren: async () => (await import('@ultra/basket')).BasketModule,
      },
      {
        path: 'checkout',
        loadChildren: async () => (await import('@ultra/checkout')).CheckoutModule,
      },
    ],
  },
];
