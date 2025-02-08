import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MaterialDetail } from '../models/material/material-detail';
import { MaterialCreate } from '../models/material/material-create';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private readonly baseUrl = '/api/v1/Material';
  private http = inject(HttpClient);

  // Fetch all materials
  getMaterials(): Observable<MaterialDetail[]> {
    return this.http.get<MaterialDetail[]>(`${this.baseUrl}/`);
  }

  // Fetch a single material by ID
  getMaterialById(id: string): Observable<MaterialDetail> {
    return this.http.get<MaterialDetail>(`${this.baseUrl}/${id}`);
  }

  // Create a new material
  createMaterial(data: MaterialCreate): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/`, data);
  }

  // Delete a material
  deleteMaterial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
