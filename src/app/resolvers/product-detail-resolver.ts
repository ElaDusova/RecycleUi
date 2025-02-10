import { ProductDetail } from '../models/product/product-detail.interface';
import { Router, type ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { inject } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<ProductDetail | undefined> {
  constructor(private productService: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ProductDetail | undefined> {
    const productId = route.paramMap.get('productId');

    if (productId) {
      return this.productService.getProduct(productId).pipe(
        switchMap((product) => {
          if (product && !product.isVerified) {
            return this.productService.verifyProduct(product.id).pipe(
              switchMap(() => this.productService.getProduct(product.id)), // ✅ Refetch updated product
              catchError((err) => {
                console.error('Error verifying product:', err);
                return of(product);
              })
            );
          }
          return of(product);
        }),
        catchError((err) => {
          console.error('Error fetching product:', err);
          return of(undefined);
        })
      );
    } else {
      console.error('No productId found in route parameters');
      return of(undefined);
    }
  }

}
