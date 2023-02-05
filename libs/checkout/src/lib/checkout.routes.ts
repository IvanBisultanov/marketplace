import { Route } from '@angular/router';
import { CheckoutShellComponent } from './checkout-shell/checkout-shell.component';

export const checkoutRoutes: Route[] = [
  {
    path: '',
    component: CheckoutShellComponent,
  },
];
