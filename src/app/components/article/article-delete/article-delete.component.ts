import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { ArticleDetail } from '../../../models/article/article-detail.interface';

@Component({
  selector: 'app-article-delete',
  templateUrl: './article-delete.component.html',
  styleUrls: ['./article-delete.component.scss']
})
export class ArticleDeleteComponent implements OnInit {
  articles: ArticleDetail[] = [];
  errorMessage: string | null = null;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articleService.getArticles().subscribe({
      next: (data) => this.articles = data,
      error: (err) => {
        console.error('Failed to fetch articles:', err);
        this.errorMessage = 'Failed to load articles.';
      }
    });
  }

  deleteArticle(id: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
    this.articleService.deleteArticle(id).subscribe({
        next: () => this.fetchArticles(),
        error: (err) => this.errorMessage = 'Failed to delete article.'
      });
    }
  }
}
