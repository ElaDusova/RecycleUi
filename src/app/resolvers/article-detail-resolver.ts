import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { ArticleDetail } from '../models/article/article-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailResolver implements Resolve<ArticleDetail[] | undefined> {
  constructor(private articleService: ArticleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArticleDetail[] | undefined> {
    const articleId = route.paramMap.get('articleId');

    if (!articleId) {
      console.error('Article ID was not found');
      return of(undefined);
    }

    return this.articleService.getArticles().pipe(
      catchError((err) => {
        console.log(err);
        this.router.navigate(['']);
        return of(undefined);
      })
    );
  }
}
