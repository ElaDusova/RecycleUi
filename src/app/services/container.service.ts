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

    createContainer(model: ContainerCreate): Observable<ContainerDetail> {
      return this.httpClient.post<ContainerDetail>(this.baseUrl, model);
    }

    getContainers(): Observable<ContainerView[]> {
      return this.httpClient.get<ContainerView[]>(this.baseUrl);
    }

    getContainerById(id: string): Observable<ContainerDetail> {
      return this.httpClient.get<ContainerDetail>(`${this.baseUrl}${id}`);
    }

    updateContainer(id: string, patch: any): Observable<ContainerDetail> {
      return this.httpClient.patch<ContainerDetail>(`${this.baseUrl}${id}`, patch);
    }
    uploadContainerImage(imageFile: File): Observable<{ imagePath: string }> {
      const formData = new FormData();
      formData.append('trashCanImage', imageFile);

      return this.httpClient.post<{ imagePath: string }>(`${this.baseUrl}/UploadTrashCanImage/`, formData);
    }
        deleteContainer(id: string): Observable<void> {
      return this.httpClient.delete<void>(`${this.baseUrl}${id}`);
    }
  }
