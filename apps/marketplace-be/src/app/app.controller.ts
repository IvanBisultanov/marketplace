import { Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';

import { CheckoutForm, CheckoutResponse, DepositResponse, Product } from '@ultra/models';

import { productEntities, products } from './mock.data';

let basket: Set<string> = new Set();
const deposit = {
  value: 1000,
  currency: '€',
};

@Controller()
export class AppController {
  @Get('products')
  async getProducts(): Promise<Product[]> {
    await this.delay(1500); // emulate network
    return products.filter((product) => product.available);
  }

  @Get('selected-products')
  async getSelectedProducts(): Promise<Product[]> {
    return [...basket].map((id) => productEntities[id]).filter(Boolean);
  }

  @Patch('add-product/:id')
  @HttpCode(204)
  async addProduct(@Param('id') id: string): Promise<void> {
    await this.delay(1000); // emulate network
    basket.add(id);
  }

  @Delete('delete-product/:id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.delay(1000); // emulate network
    basket.delete(id);
  }

  @Get('deposit')
  async getDeposit(): Promise<DepositResponse> {
    await this.delay(1000); // emulate network
    return deposit;
  }

  @Post('checkout')
  async checkout(@Param() checkoutForm: CheckoutForm): Promise<CheckoutResponse> {
    await this.delay(1500); // emulate network
    // some checkoutForm validation
    const totalValue = [...basket]
      .map((id) => productEntities[id])
      .reduce((acc, item) => (acc += item.price.value), 0);
    if (totalValue < deposit.value) {
      deposit.value -= totalValue;
      [...basket].map((productInBasket) => {
        const product = products.find((product) => product.id === productInBasket);
        if (product) {
          product.available = false;
        }
      });
      basket = new Set();
      return {
        success: true,
        deposit,
      };
    }
    return {
      success: false,
      deposit,
    };
  }

  private delay(timeout: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
}
