import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../product-list/product-detail';
import { ProductCreate } from '../product-list/product-create';
import { ProductView } from '../product-list/product-view';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected readonly baseUrl = '/api/v1/Product';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductDetail[]>{
    const url = this.baseUrl;
    return this.httpClient.get<ProductDetail[]>(url);
  }
  getProduct(id: string): Observable<ProductView>{
    const url = `${this.baseUrl}`;
    return this.httpClient.get<ProductView>(url);
  }
  createProduct(data: ProductCreate) : Observable<ProductDetail>{
    const url = this.baseUrl;
    return this.httpClient.get<ProductDetail>(url);
  }
}
