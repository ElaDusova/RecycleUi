import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleCreateModel } from '../models/article/article-create.interface';
import { ArticleDetail } from '../models/article/article-detail.interface';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'api/v1/Article/';
  private readonly userBaseUrl = '/api/v1/User'; // Assuming there's an API for user info


  constructor(private http: HttpClient) {}

  createArticle(model: ArticleCreateModel): Observable<ArticleDetail> {
    return this.http.post<ArticleDetail>(this.baseUrl, model);
  }
  getUserById(userId: string): Observable<{ displayName: string; userName: string }> {
    return this.http.get<{ displayName: string; userName: string }>(`${this.userBaseUrl}/${userId}`);
  }
  getArticles(): Observable<ArticleDetail[]> {
    return this.http.get<ArticleDetail[]>(this.baseUrl);
  }

  getArticleById(id: string): Observable<ArticleDetail> {
    return this.http.get<ArticleDetail>(`${this.baseUrl}${id}`);
  }

  updateArticle(id: string, patch: any): Observable<ArticleDetail> {
    return this.http.patch<ArticleDetail>(`${this.baseUrl}${id}`, patch);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}
