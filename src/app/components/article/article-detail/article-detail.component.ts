import { Component, Input } from '@angular/core';
import { ArticleDetail } from '../../../models/article/article-detail.interface';
import { CommonModule } from '@angular/common';

/**
 * Displays details of an article.
 */
@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent {
    /**
   * The article data to display.
   */
  @Input() article!: ArticleDetail;
}
