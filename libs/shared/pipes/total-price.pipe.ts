import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '@ultra/models';

@Pipe({
  name: 'totalPrice',
  standalone: true,
})
export class TotalPricePipe implements PipeTransform {
  public transform(items: Product[] | null): number | null {
    if (!items) {
      return items;
    }
    return items.reduce((acc, item) => (acc += item.price.value), 0);
  }
}
