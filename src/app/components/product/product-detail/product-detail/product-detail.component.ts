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
  protected hasParts: boolean = false;

  ngOnInit(): void {
    if (this.product && this.product.parts) {
      this.hasParts = this.product.parts.length > 0;
    }
  }
}
