import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
protected formular;
protected products$;

constructor(formBuilder: FormBuilder, protected ps: ProductService){
  this.formular =
  formBuilder.group({
    content: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
  })
  this.products$ = this.ps.getProducts();
}
showForm: boolean = false;
onSubmit(): void{
  const data = this.formular.getRawValue();
  this.ps.createProduct(data).subscribe({
    next: () =>{
      //this.refreshData();
      //this.closeForm();
    }
  })
}
}
