import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDetail } from '../../models/article/article-detail.interface'; // Ensure this import is correct
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Ensure this import is correct

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'Home Page';
  articles: ArticleDetail[] = [];

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.articles = data['articles'];
    });
  }

  // Navigate to the article detail page when an article is clicked
  viewArticleDetail(articleId: string) {
    this.router.navigate(['/article/detail', articleId]);
  }
}
