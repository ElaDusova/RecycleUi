import { Component, Input } from '@angular/core';
import { ProductDetail } from '../../../../models/product/product-detail.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  @Input() product!: ProductDetail;
}
