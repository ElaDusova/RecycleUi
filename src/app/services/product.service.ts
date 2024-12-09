import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../models/product/product-detail.interface';
import { ProductCreate } from '../models/product/product-create.interface';
import { ProductView } from '../models/product/product-view.interface';


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
