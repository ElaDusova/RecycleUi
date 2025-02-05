import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../models/product/product-detail.interface';
import { ProductCreate } from '../models/product/product-create.interface';
import { JsonPatchDocument } from '../models/JSON/JsonPatchDocument';

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
  // Create a new product (should use POST)
  createProduct(data: ProductCreate): Observable<ProductDetail> {
    const url = this.baseUrl;
    return this.httpClient.post<ProductDetail>(url, data);  // Changed to POST
  }
  updateProduct(id: string, patchDocument: JsonPatchDocument[]): Observable<ProductDetail> {
    return this.httpClient.patch<ProductDetail>(`${this.baseUrl}/${id}`, patchDocument);
  }
  deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
      // Search for products by EAN
  searchProductsByEAN(ean: string): Observable<ProductDetail[]> {
    return this.httpClient.get<ProductDetail[]>(`api/v1/Product/search?ean=${ean}`);
  }
  }
