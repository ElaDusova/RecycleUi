import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../models/product/product-detail.interface';
import { ProductCreate } from '../models/product/product-create.interface';

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

  // Search for products by EAN
  searchProductsByEAN(ean: string): Observable<ProductDetail[]> {
    const url = `${this.baseUrl}/search?ean=${ean}`;  // Adjust API endpoint to support EAN search
    return this.httpClient.get<ProductDetail[]>(url);  // Return an observable of ProductDetail array
  }
}
