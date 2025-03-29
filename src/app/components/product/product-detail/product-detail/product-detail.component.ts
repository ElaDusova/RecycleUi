import { Component, Input, OnInit } from '@angular/core';
import { ProductDetail } from '../../../../models/product/product-detail.interface';
import { CommonModule } from '@angular/common';
/**
 * Displays details of a product, including its parts.
 */
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
    /** The product data to display */

  @Input() product!: ProductDetail;
    /** Indicates whether the product has associated parts */
  protected hasParts: boolean = false;

    /**
   * Initializes component and checks if the product has parts.
   */
  ngOnInit(): void {
    console.log(this.product.parts);
    if (this.product && this.product.parts) {
      this.hasParts = this.product.parts.length > 0;
    }
  }
}
