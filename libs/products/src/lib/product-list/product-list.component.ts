import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@ultra/models';

import { ProductPreviewComponent } from '../product-preview/product-preview.component';

@Component({
  selector: 'ultra-product-list',
  standalone: true,
  imports: [CommonModule, ProductPreviewComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input() public products: Product[] | null = null;
  @Input() public productsPending: boolean | null = false;
  @Input() public selectedIds: Record<string, true> | null = null;
  @Output() public selectProduct: EventEmitter<Product> = new EventEmitter();
  public readonly skeletonArray = [...Array(24).keys()];

  public trackById(_: number, project: Product): string {
    return project.id;
  }
}
