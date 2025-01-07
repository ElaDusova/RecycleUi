import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail/product-detail.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    ProductDetailComponent,
    RouterModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
protected readonly fb = inject(FormBuilder);
protected readonly productService = inject(ProductService);

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
protected products$ = this.productService.getProducts();

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
closeForm() {
  this.showForm = false;
  this.formular.reset();
}

refreshData() {
  this.products$ = this.productService.getProducts();
}

}
