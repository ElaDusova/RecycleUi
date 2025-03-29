import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PartDetail } from '../models/part/part-detail';
import { JsonPatchDocument } from '../models/JSON/JsonPatchDocument';
import { PartCreate } from '../models/part/part-create';

/**
 * Service for managing parts.
 * Provides methods to retrieve, create, update, and delete parts.
 */

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private readonly baseUrl = '/api/v1/Part';
  private http = inject(HttpClient);

  /**
   * Retrieves a list of all parts.
   * @returns Observable array of part details.
   */
    getParts(): Observable<PartDetail[]> {
    return this.http.get<PartDetail[]>(this.baseUrl);
  }

  /**
   * Retrieves a specific part by ID.
   * @param id - The unique part ID.
   * @returns Observable containing the part details.
   */
    getPartById(id: string): Observable<PartDetail> {
    return this.http.get<PartDetail>(`${this.baseUrl}/${id}`);
  }

  /**
   * Creates a new part.
   * @param data - The part creation data.
   * @returns Observable containing the created part details.
   */
  createPart(data: PartCreate): Observable<PartDetail> {
    return this.http.post<PartDetail>(this.baseUrl, data);
  }

  /**
   * Updates an existing part using JSON Patch.
   * @param id - The ID of the part to update.
   * @param patch - The patch document containing update operations.
   * @returns Observable containing the updated part details.
   */
  updatePart(id: string, patch: JsonPatchDocument[]): Observable<PartDetail> {
    return this.http.patch<PartDetail>(`${this.baseUrl}/${id}`, patch, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
    });
  }

  /**
   * Deletes a part by ID.
   * @param id - The ID of the part to delete.
   * @returns Observable that completes when the deletion is done.
   */
  deletePart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
