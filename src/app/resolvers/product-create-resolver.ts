import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductCreate } from '../models/product/product-create.interface';
import { ProductService } from '../services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCreateResolver implements Resolve<ProductCreate> {
  constructor(private productService: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductCreate> {
    // Create an empty product template for the form
    const newProduct: ProductCreate = {
      name: '',
      ean: '',
      description: '',
      picturePath: null,
    };

    return of(newProduct); // Return the empty object to the form
  }
}
