import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetail } from '../models/product/product-detail.interface';
import { ProductCreate } from '../models/product/product-create.interface';
import { Operation } from 'fast-json-patch';

/**
 * Service for managing products.
 * Provides methods to retrieve, create, update, and delete products.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  protected readonly baseUrl = '/api/v1/Product';
  private readonly httpClient = inject(HttpClient);

 /**
   * Retrieves a list of all products.
   * @returns Observable array of product details.
   */
  getProducts(): Observable<ProductDetail[]> {
    return this.httpClient.get<ProductDetail[]>(this.baseUrl);
  }

  /**
   * Retrieves a specific product by ID.
   * @param id - The unique product ID.
   * @returns Observable containing the product details.
   */
  getProduct(id: string): Observable<ProductDetail> {
    return this.httpClient.get<ProductDetail>(`${this.baseUrl}/${id}`);
  }

  /**
   * Creates a new product.
   * @param product - The product creation data.
   * @returns Observable containing the created product ID.
   */
  createProduct(product: ProductCreate): Observable<{ id: string }> {
    return this.httpClient.post<{ id: string }>(this.baseUrl, product, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  /**
   * Uploads an image for a product.
   * @param imageFile - The image file to upload.
   * @returns Observable containing the uploaded image path.
   */
  uploadProductImage(imageFile: File): Observable<{ imagePath: string }> {
  const formData = new FormData();
  formData.append('productImage', imageFile);

  return this.httpClient.post<{ imagePath: string }>(`${this.baseUrl}/UploadProductImage/`, formData);
}

  /**
   * Updates a product using JSON Patch.
   * @param id - The ID of the product to update.
   * @param patch - The patch operations to apply.
   * @returns Observable containing a success message.
   */
  updateProduct(id: string, patch: Operation[]): Observable<{ message: string }> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json-patch+json' });
  return this.httpClient.patch<{ message: string }>(`${this.baseUrl}/${id}`, patch, { headers });
}

  /**
   * Deletes a product by ID.
   * @param id - The ID of the product to delete.
   * @returns Observable that completes when the deletion is done.
   */
  deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Searches for products by EAN code.
   * @param ean - The EAN code to search for.
   * @returns Observable array of product details matching the EAN.
   */
  searchProductsByEAN(ean: string): Observable<ProductDetail[]> {
    return this.httpClient.get<ProductDetail[]>(`/api/v1/Product/search?ean=${ean}`);
  }

  /**
   * Marks a product as verified.
   * @param id - The ID of the product to verify.
   * @returns Observable containing the updated product details.
   */
  verifyProduct(id: string): Observable<ProductDetail> {
    const patchData = [{ op: 'replace', path: '/isVerified', value: true }];
    return this.httpClient.patch<ProductDetail>(`${this.baseUrl}/${id}`, patchData);
  }
}
