import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticleCreateModel } from '../../../models/article/article-create.interface';
import { ArticleService } from '../../../services/article.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-articles-page',
  templateUrl: './add-articles-page.component.html',
  imports: [FormsModule, CommonModule]
})
export class AddArticlesPageComponent implements OnInit {
  private articleService = inject(ArticleService);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // File input reference

  article: ArticleCreateModel = {
    heading: '',
    authorsName: '',
    annotation: '',
    text: '',
    picturePath: null
  };

  currentDate: string = new Date().toLocaleDateString();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;
  userId: string = ''; // The logged-in user's ID

  ngOnInit(): void {
    this.userId = this.getLoggedInUserId(); // Get user ID from local storage/session
  }

  getLoggedInUserId(): string {
    return localStorage.getItem('userId') || ''; // Assuming user ID is stored after login
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      this.article.picturePath = URL.createObjectURL(file);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  createArticle(): void {
    this.isSubmitting = true;

    this.articleService.createArticle(this.article).subscribe({
      next: () => {
        this.successMessage = 'Article created successfully!';
        this.errorMessage = null;
        this.article = { heading: '', authorsName: this.article.authorsName, annotation: '', text: '', picturePath: null };
      },
      error: (err) => {
        console.error('Error creating article:', err);
        this.errorMessage = err.error?.errors ? Object.values(err.error.errors).join(', ') : 'Failed to create article.';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
