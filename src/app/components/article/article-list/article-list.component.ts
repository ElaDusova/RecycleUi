
// import { Component, inject } from '@angular/core';
// import { CommonModule, AsyncPipe } from '@angular/common';
// import { RouterModule } from '@angular/router';
// import { FormBuilder, FormControl, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
// import { ArticleDetailComponent } from '../article-detail/article-detail.component';
// import { ArticleService } from '../../../services/article.service';

// @Component({
//   selector: 'app-article-list',
//   imports: [
//        CommonModule,
//         AsyncPipe,
//         FormsModule,
//         ReactiveFormsModule,
//         ArticleDetailComponent,
//         RouterModule
//   ],
//   templateUrl: './article-list.component.html',
//   styleUrl: './article-list.component.scss'
// })
// export class ArticleListComponent {
// protected readonly fb = inject(FormBuilder);
// protected readonly articleService = inject(ArticleService);

//   protected formular = this.fb.group({
//   heading: new FormControl('', {
//     nonNullable: true,
//     validators: [Validators.required],
//   }),
//   anotationn: new FormControl('', {
//     nonNullable: true,
//     validators: [Validators.required],
//   }),
// });

// protected articles$ = this.articleService.getArticles();

// showForm: boolean = false;

// onSubmit(): void {
//   const data = this.formular.getRawValue();

//   this.articleService.createArticle(data).subscribe({
//     next: () => {
//       this.refreshData();
//       this.closeForm();
//     },
//   });
// }
// closeForm() {
//   this.showForm = false;
//   this.formular.reset();
// }

// refreshData() {
//   this.articles$ = this.articleService.getArticles();
// }
// }
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
import { ArticleDetail } from '../../../models/article/article-detail.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles$!: Observable<ArticleDetail[]>;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles();
  }
}
