import { Component, OnInit, input } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDetail } from '../../models/article/article-detail.interface'; // Ensure this import is correct
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Ensure this import is correct
import { FormsModule } from '@angular/forms'; // Ensure this import is correct

/**
 * Home page component displaying a list of articles.
 * Includes a search functionality to filter articles by heading or author's name.
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'Home Page';
  articles: ArticleDetail[] = [];
  filteredArticles: ArticleDetail[] = []; // Filtered articles based on user's search query
  searchQuery: string = '';


  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit() {
    // Load articles from route data or service
    this.route.data.subscribe((data) => {
      this.articles = data['articles'];
      this.filteredArticles = [...this.articles]; // Show all articles initially
    });
  }
    /**
   * Filters articles based on the search query.
   * Matches against the article heading or author's name.
   */
    onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredArticles = this.articles.filter(
      (article) =>
        article.heading.toLowerCase().includes(query) || article.authorsName.toLowerCase().includes(query)
    );
  }

    /**
   * Navigates to the article detail page when an article is clicked.
   * @param articleId - The ID of the selected article.
   */
  // Navigate to the article detail page when an article is clicked
  viewArticleDetail(articleId: string) {
    this.router.navigate(['/article/detail', articleId]);
  }
}
