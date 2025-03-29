import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContainerCreate } from '../models/container/container-create.interface';
import { ContainerDetail } from '../models/container/container-detail.interface';
import { ContainerView } from '../models/container/container-view.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContainerService {
    private baseUrl = 'api/v1/TrashCan/';

  private readonly httpClient = inject(HttpClient);

    /**
     * Creates a new container.
     * @param model - The container data.
     * @returns Observable of the created container.
     */
    createContainer(model: ContainerCreate): Observable<ContainerDetail> {
      return this.httpClient.post<ContainerDetail>(this.baseUrl, model);
    }
  /**
   * Retrieves a list of all containers.
   * @returns Observable array of container views.
   */
    getContainers(): Observable<ContainerView[]> {
      return this.httpClient.get<ContainerView[]>(this.baseUrl);
    }

  /**
   * Retrieves a specific container by ID.
   * @param id - The unique container ID.
   * @returns Observable containing the container details.
   */
    getContainerById(id: string): Observable<ContainerDetail> {
      return this.httpClient.get<ContainerDetail>(`${this.baseUrl}${id}`);
    }

  /**
   * Updates an existing container.
   * @param id - The container ID.
   * @param patch - The updated properties.
   * @returns Observable of the updated container.
   */
    updateContainer(id: string, patch: any): Observable<ContainerDetail> {
      return this.httpClient.patch<ContainerDetail>(`${this.baseUrl}${id}`, patch);
    }

      /**
   * Uploads an image for a container.
   * @param imageFile - The image file to upload.
   * @returns Observable containing the image path.
   */
    uploadContainerImage(imageFile: File): Observable<{ imagePath: string }> {
      const formData = new FormData();
      formData.append('trashCanImage', imageFile);

      return this.httpClient.post<{ imagePath: string }>(`${this.baseUrl}/UploadTrashCanImage/`, formData);
    }
      /**
   * Deletes a container by ID.
   * @param id - The ID of the container to delete.
   * @returns Observable that completes when the deletion is done.
   */
        deleteContainer(id: string): Observable<void> {
      return this.httpClient.delete<void>(`${this.baseUrl}${id}`);
    }
  }
