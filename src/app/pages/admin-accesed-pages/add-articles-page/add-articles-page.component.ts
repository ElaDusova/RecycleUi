import { Component, inject, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticleCreateModel } from '../../../models/article/article-create.interface';
import { ArticleService } from '../../../services/article.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';

/**
 * Component for creating a new article.
 * Allows users to input article details, upload an image, and submit the article.
 */
@Component({
  selector: 'app-add-articles-page',
  templateUrl: './add-articles-page.component.html',
  imports: [FormsModule, CommonModule, QuillModule],
  standalone: true
})
export class AddArticlesPageComponent implements OnInit {
  constructor(private location: Location, private articleService: ArticleService, private router: Router) {}

  selectedFile: File | null = null;
  isUploading: boolean = false;
  imagePreview: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // File input reference

  article: ArticleCreateModel = {
    heading: '',
    authorsName: '',
    annotation: '',
    text: '',
    picturePath: null
  };

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': [1, 2, 3, false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ]
  };
  currentDate: string = new Date().toLocaleDateString();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;
  userId: string = ''; // The logged-in user's ID

  ngOnInit(): void {
    this.userId = this.getLoggedInUserId(); // Get user ID from local storage/session
  }
    onSubmit(): void {
    this.article;

    if (this.selectedFile) {
      this.uploadImage();
    } else {
      this.createArticle();
    }
  }
  uploadImage(): void {
    if (!this.selectedFile) {
      console.error('No file selected for upload.');
      return;
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('articleImage', this.selectedFile);

    this.articleService.uploadArticleImage(this.selectedFile).subscribe({
      next: (uploadResponse) => {
        console.log('Article image uploaded successfully:', uploadResponse.imagePath);
        this.article.picturePath = uploadResponse.imagePath;
        this.isUploading = false;
        this.createArticle();
      },
      error: (error) => {
        console.error('Error uploading article image:', error);
        this.isUploading = false;
      }
    });
  }
  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  getLoggedInUserId(): string {
    return localStorage.getItem('userId') || ''; // Assuming user ID is stored after login
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  private createArticle(): void {
    const articlePayload = { ...this.article };

    console.log('Creating Article:', articlePayload);

    this.articleService.createArticle(articlePayload).subscribe({
      next: (response) => {
        console.log('Article created successfully:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error creating article:', error.error);
      }
    });
  }
  goBack(): void {
    this.location.back(); // Navigate to the previous page in history
  }
}
