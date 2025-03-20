import { Component, Input, OnInit } from '@angular/core';
import { ProductDetail } from '../../../../models/product/product-detail.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  @Input() product!: ProductDetail;
  protected hasParts: boolean = false;

  ngOnInit(): void {
    console.log(this.product.parts);
    if (this.product && this.product.parts) {
      this.hasParts = this.product.parts.length > 0;
    }
  }
}
