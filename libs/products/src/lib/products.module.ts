import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './products.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(productsRoutes)],
})
export class ProductsModule {}
