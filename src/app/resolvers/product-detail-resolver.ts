import { ProductDetail } from '../models/product/product-detail.interface';
import { Router, type ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';


export const productDetailResolver: ResolveFn<undefined | ProductDetail> = (
  route,
  state
) => {
  const productId = route.paramMap.get('productId');
  const router = inject(Router);
  const productService = inject(ProductService);

  if (!productId) {
    // Message // Toaster
    console.error('Product Id was not found');
    return of(undefined);
  }

  return productService.getProduct(productId).pipe(
    catchError(async (err) => {
      console.log(err);
      await router.navigate(['']);
      throw of(err);
    })
  );
};
