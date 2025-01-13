import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail/product-detail.component';  // Import the ProductDetailComponent
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // ProductDetailComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly productService = inject(ProductService);

  eanInput: string = ''; // For the EAN input field

  protected formular = this.fb.group({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    ean: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    picturePath: new FormControl('', {
      nonNullable: false,
    }),
  });

  private productsSubject = new BehaviorSubject<any[]>([]); // Create a BehaviorSubject to manage products
  protected products$ = this.productsSubject.asObservable(); // Convert it to an observable for use in the template

  showForm: boolean = false;

  onSubmit(): void {
    const data = this.formular.getRawValue();

    this.productService.createProduct(data).subscribe({
      next: () => {
        this.refreshData();
        this.closeForm();
      },
    });
  }

  closeForm(): void {
    this.showForm = false;
    this.formular.reset();
  }

  refreshData(): void {
    this.productService.getProducts().subscribe((products) => {
      this.productsSubject.next(products); // Update the products when refreshed
    });
  }

  onSearchSubmit(): void {
    if (this.eanInput) {
      console.log('Searching for EAN:', this.eanInput);
      // Implement EAN search logic here (e.g., call a service to search products by EAN)
      this.productService.searchProductsByEAN(this.eanInput).subscribe({
        next: (results) => {
          this.productsSubject.next(results); // Update the products list with search results
        },
      });
    }
  }
}
