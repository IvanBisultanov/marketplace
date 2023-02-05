import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { basketRoutes } from './basket.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(basketRoutes)],
})
export class BasketModule {}
