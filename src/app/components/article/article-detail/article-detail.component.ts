import { Component, Input, OnChanges } from '@angular/core';
import { ArticleDetail } from '../../../models/article/article-detail.interface';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss'
})
export class ArticleDetailComponent implements OnChanges {
  @Input() article!: ArticleDetail;
  safeText!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.article?.text) {
      this.safeText = this.sanitizer.bypassSecurityTrustHtml(this.article.text);
    }
  }

}
