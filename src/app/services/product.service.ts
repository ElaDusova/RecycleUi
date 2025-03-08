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
    return this.httpClient.get<ProductDetail[]>(this.baseUrl);
  }

  // Fetch a single product by ID
  getProduct(id: string): Observable<ProductDetail> {
    return this.httpClient.get<ProductDetail>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: ProductCreate): Observable<{ id: string }> {
    return this.httpClient.post<{ id: string }>(this.baseUrl, product, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

// Upload product image separately
uploadProductImage(imageFile: File): Observable<{ imagePath: string }> {
  const formData = new FormData();
  formData.append('productImage', imageFile);

  return this.httpClient.post<{ imagePath: string }>(`${this.baseUrl}/UploadProductImage/`, formData);
}

// Update product (patching data)
updateProduct(id: string, patch: Operation[]): Observable<{ message: string }> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json-patch+json' });
  return this.httpClient.patch<{ message: string }>(`${this.baseUrl}/${id}`, patch, { headers });
}

  // Delete product
  deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Search products by EAN
  searchProductsByEAN(ean: string): Observable<ProductDetail[]> {
    return this.httpClient.get<ProductDetail[]>(`/api/v1/Product/search?ean=${ean}`);
  }

  // Verify product
  verifyProduct(id: string): Observable<ProductDetail> {
    const patchData = [{ op: 'replace', path: '/isVerified', value: true }];
    return this.httpClient.patch<ProductDetail>(`${this.baseUrl}/${id}`, patchData);
  }
}
