import { Component, Input } from '@angular/core';
import { ArticleDetail } from '../../../models/article/article-detail.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent {
  @Input() article!: ArticleDetail;
}
