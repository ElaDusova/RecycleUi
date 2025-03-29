import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleCreateModel } from '../models/article/article-create.interface';
import { ArticleDetail } from '../models/article/article-detail.interface';

/**
 * Service for handling article-related operations.
 * Provides methods to create, retrieve, update, and delete articles.
 */
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private baseUrl = 'api/v1/Article/';
  private readonly userBaseUrl = '/api/v1/User'; // Assuming there's an API for user info


  constructor(private http: HttpClient) {}

    /**
   * Creates a new article.
   * @param model - Data for the article creation.
   * @returns An Observable of the created article.
   */
  createArticle(model: ArticleCreateModel): Observable<ArticleDetail> {
    const fixedModel = {
      ...model,
      text: model.text.replace(/\r\n/g, '\n')
    };

    return this.http.post<ArticleDetail>(this.baseUrl, fixedModel);
  }

    /**
   * Retrieves user details by ID.
   * @param userId - The ID of the user.
   * @returns An Observable containing user display and username.
   */
  getUserById(userId: string): Observable<{ displayName: string; userName: string }> {
    return this.http.get<{ displayName: string; userName: string }>(`${this.userBaseUrl}/${userId}`);
  }

    /**
   * Retrieves a list of all articles.
   * @returns An Observable containing an array of articles.
   */
  getArticles(): Observable<ArticleDetail[]> {
    return this.http.get<ArticleDetail[]>(this.baseUrl);
  }

    /**
   * Retrieves a specific article by ID.
   * @param id - The ID of the article.
   * @returns An Observable containing the article details.
   */
  getArticleById(id: string): Observable<ArticleDetail> {
    return this.http.get<ArticleDetail>(`${this.baseUrl}${id}`);
  }

    /**
   * Updates an existing article.
   * @param id - The ID of the article.
   * @param patch - The patch object containing updated fields.
   * @returns An Observable containing the updated article.
   */
  updateArticle(id: string, patch: any): Observable<ArticleDetail> {
    return this.http.patch<ArticleDetail>(`${this.baseUrl}${id}`, patch);
  }
  /**
   * Uploads an image for an article.
   * @param imageFile - The image file to be uploaded.
   * @returns An Observable containing the uploaded image path.
   */
    uploadArticleImage(imageFile: File): Observable<{ imagePath: string }> {
    const formData = new FormData();
    formData.append('articleImage', imageFile);

    return this.http.post<{ imagePath: string }>(`${this.baseUrl}/UploadArticleImage/`, formData);
  }

    /**
   * Deletes an article by ID.
   * @param id - The ID of the article to delete.
   * @returns An Observable that completes when the article is deleted.
   */
  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}
