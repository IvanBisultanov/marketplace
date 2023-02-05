import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { checkoutRoutes } from './checkout.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(checkoutRoutes)],
})
export class CheckoutModule {}
