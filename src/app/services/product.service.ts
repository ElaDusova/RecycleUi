import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../models/product/product-detail.interface';
import { ProductCreate } from '../models/product/product-create.interface';
import { Operation } from 'fast-json-patch';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected readonly baseUrl = '/api/v1/Product';
  private readonly httpClient = inject(HttpClient);

  // Fetch all products
  getProducts(): Observable<ProductDetail[]> {
    const url = this.baseUrl;
    return this.httpClient.get<ProductDetail[]>(url);
  }

  // Fetch a single product by ID
  getProduct(id: string): Observable<ProductDetail> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<ProductDetail>(url);
  }
// product.service.ts
createProduct(product: ProductCreate): Observable<void> {
  return this.httpClient.post<void>(`${this.baseUrl}`, product, {
    headers: { 'Content-Type': 'application/json' }
  });
}
  updateProduct(id: string, patch: Operation[]): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json-patch+json' });
    return this.httpClient.patch<void>(`${this.baseUrl}/${id}`, patch, { headers });
  }
    deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
      // Search for products by EAN
  searchProductsByEAN(ean: string): Observable<ProductDetail[]> {
    return this.httpClient.get<ProductDetail[]>(`api/v1/Product/search?ean=${ean}`);
  }
  verifyProduct(id: string): Observable<ProductDetail> {
    const patchData = [{ op: 'replace', path: '/isVerified', value: true }];
    return this.httpClient.patch<ProductDetail>(`${this.baseUrl}/${id}`, patchData);
  }
  }

  // through, though
