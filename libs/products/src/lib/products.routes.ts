import { Route } from '@angular/router';
import { ProductsShellComponent } from './products-shell/products-shell.component';

export const productsRoutes: Route[] = [
  {
    path: '',
    component: ProductsShellComponent,
  },
];
