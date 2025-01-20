import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContainerCreate } from '../models/container/container-create.interface';
import { ContainerDetail } from '../models/container/container-detail.interface';
import { ContainerView } from '../models/container/container-view.interface';


@Injectable({
  providedIn: 'root'
})
export class ContainerService {
    private baseUrl = 'api/v1/TrashCan/';

    constructor(private http: HttpClient) {}

    createContainer(model: ContainerCreate): Observable<ContainerDetail> {
      return this.http.post<ContainerDetail>(this.baseUrl, model);
    }

    getContainers(): Observable<ContainerView[]> {
      return this.http.get<ContainerView[]>(this.baseUrl);
    }

    getContainerById(id: string): Observable<ContainerDetail> {
      return this.http.get<ContainerDetail>(`${this.baseUrl}${id}`);
    }

    updateContainer(id: string, patch: any): Observable<ContainerDetail> {
      return this.http.patch<ContainerDetail>(`${this.baseUrl}${id}`, patch);
    }

    deleteContainer(id: string): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}${id}`);
    }
  }
