import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetail } from '../../models/article/article-detail.interface'; // Ensure this import is correct
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../../components/product/product-detail/product-detail/product-detail.component';
import { ProductDetail } from '../../models/product/product-detail.interface';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'Home Page';
  articles: ArticleDetail[] = []; // Define the type of articles as ArticleDetail[]

  constructor(private articleService: ArticleService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.articles = data['articles'];
    });
  }
}
