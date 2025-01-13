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

  constructor(private http: HttpClient) {}

  createArticle(model: ArticleCreateModel): Observable<ArticleDetail> {
    return this.http.post<ArticleDetail>(this.baseUrl, model);
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
