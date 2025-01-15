import { Component, OnInit, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDetail } from '../../models/article/article-detail.interface';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from "../../components/article/article-detail/article-detail.component";

@Component({
  selector: 'app-article-detail-page',
  templateUrl: './article-detail-page.component.html',
  imports: [CommonModule, ArticleDetailComponent],
  styleUrls: ['./article-detail-page.component.scss']
})
export class ArticleDetailPageComponent {
  readonly article = input.required<ArticleDetail>();

 }
