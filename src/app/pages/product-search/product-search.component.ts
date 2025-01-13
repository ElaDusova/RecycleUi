import { Component } from '@angular/core';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';

@Component({
  selector: 'app-product-search',
  imports: [ProductListComponent],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {

}
