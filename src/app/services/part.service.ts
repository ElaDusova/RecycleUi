import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PartDetail } from '../models/part/part-detail';
import { JsonPatchDocument } from '../models/JSON/JsonPatchDocument';
import { PartCreate } from '../models/part/part-create';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private readonly baseUrl = '/api/v1/Part';
  private http = inject(HttpClient);

  // Fetch all parts
  getParts(): Observable<PartDetail[]> {
    return this.http.get<PartDetail[]>(this.baseUrl);
  }

  // Fetch a single part by ID
  getPartById(id: string): Observable<PartDetail> {
    return this.http.get<PartDetail>(`${this.baseUrl}/${id}`);
  }

  // Create a new part
  createPart(data: PartCreate): Observable<PartDetail> {
    return this.http.post<PartDetail>(this.baseUrl, data);
  }

  // Update an existing part (PATCH)
  updatePart(id: string, patch: JsonPatchDocument[]): Observable<PartDetail> {
    return this.http.patch<PartDetail>(`${this.baseUrl}/${id}`, patch, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
    });
  }
  // Delete a part
  deletePart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
