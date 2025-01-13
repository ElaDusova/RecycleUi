import { Component, Input } from '@angular/core';
import { ProductDetail } from '../../../../models/product/product-detail.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  @Input() item!: ProductDetail;
}
