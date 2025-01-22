import { Component, input } from '@angular/core';
import { ProductDetail } from '../../../models/product/product-detail.interface';
import { ProductDetailComponent } from '../../../components/product/product-detail/product-detail/product-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent {
  readonly product = input.required<ProductDetail>();
}

