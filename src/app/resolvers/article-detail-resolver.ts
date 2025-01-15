import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { ArticleDetail } from '../models/article/article-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailResolver implements Resolve<ArticleDetail | undefined> {
  constructor(private articleService: ArticleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleDetail | undefined> {
    const articleId = route.paramMap.get('articleId');  // Retrieve article ID from URL

    if (!articleId) {
      console.error('Article ID not found');
      return of(undefined);  // Return undefined if no article ID is provided
    }

    return this.articleService.getArticleById(articleId).pipe(
      catchError((err) => {
        console.error('Error fetching article:', err);  // Log error
        this.router.navigate(['/']);  // Redirect to homepage if error occurs
        return of(undefined);  // Return undefined if there is an error
      })
    );
  }
}
