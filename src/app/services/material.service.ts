import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialDetail } from '../models/material/material-detail';
import { MaterialCreate } from '../models/material/material-create';

/**
 * Service for managing materials.
 * Provides methods to retrieve, create, and delete materials.
 */
@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private readonly baseUrl = '/api/v1/Material';
  private http = inject(HttpClient);

 /**
   * Retrieves a list of all materials.
   * @returns Observable array of material details.
   */
  getMaterials(): Observable<MaterialDetail[]> {
    return this.http.get<MaterialDetail[]>(`${this.baseUrl}/`);
  }

  /**
   * Retrieves a specific material by ID.
   * @param id - The unique material ID.
   * @returns Observable containing the material details.
   */
    getMaterialById(id: string): Observable<MaterialDetail> {
    return this.http.get<MaterialDetail>(`${this.baseUrl}/${id}`);
  }

  /**
   * Creates a new material.
   * @param data - The material creation data.
   * @returns Observable that completes when creation is done.
   */
    createMaterial(data: MaterialCreate): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/`, data);
  }

  /**
   * Deletes a material by ID.
   * @param id - The ID of the material to delete.
   * @returns Observable that completes when the deletion is done.
   */
    deleteMaterial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
