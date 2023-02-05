import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { Product } from '@ultra/models';

@Component({
  selector: 'ultra-product-preview',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPreviewComponent {
  @Input() public product?: Product;
  @Input() public isSelected?: boolean;
  @Output() public selectProduct: EventEmitter<void> = new EventEmitter();
}
