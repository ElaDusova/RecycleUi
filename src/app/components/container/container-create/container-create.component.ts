import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContainerService } from '../../../services/container.service';
import { ContainerCreate } from '../../../models/container/container-create.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';


/**
 * Component for creating a new trash container.
 */
@Component({
  selector: 'app-container-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './container-create.component.html',
  styleUrls: ['./container-create.component.scss']
})
export class ContainerCreateComponent {
  /** Tracks the submission state. */
  protected isSubmitting = signal<boolean>(false);

  /** Stores success messages after a successful container creation. */
  protected successMessage = signal<string | null>(null);

  /** Stores error messages if container creation fails. */
  protected errorMessage = signal<string | null>(null);

  /** Stores the selected file for upload. */
  selectedFile: File | null = null;

  /** Indicates whether an image upload is in progress. */
  isUploading: boolean = false;

  /** Stores the image preview URL. */
  imagePreview: string | null = null;

  constructor(private location: Location, private containerService: ContainerService, private router: Router) {}

  protected availableTypes: string[] = ['Plastic', 'Glass', 'Metal', 'Paper', 'Cartons', 'Electronics', 'Bio', 'CommunalTrash', 'Textile', 'Collection Yard'];

    /** File input reference for triggering the file selection manually. */
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    /** Model for new container creation. */
  protected newContainer: ContainerCreate = {
    name: '',
    description: '',
    picturePath: null,
    type: 'Plastic', // Default
  };

 /**
   * Handles file selection and updates the image preview.
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

   /**
   * Handles file selection and updates the image preview.
   */
    onSubmit(): void {
    this.newContainer;

    if (this.selectedFile) {
      this.uploadImage();
    } else {
      this.createContainer();
    }
  }

    /**
   * Uploads an image before creating the container.
   */
  uploadImage(): void {
    if (!this.selectedFile) {
      console.error('No file selected for upload.');
      return;
    }

    this.isUploading = true;
    const formData = new FormData();
    formData.append('trashCanImage', this.selectedFile);

    this.containerService.uploadContainerImage(this.selectedFile).subscribe({
      next: (uploadResponse) => {
        console.log('Container image uploaded successfully:', uploadResponse.imagePath);
        this.newContainer.picturePath = uploadResponse.imagePath;
        this.isUploading = false;
        this.createContainer();
      },
      error: (error) => {
        console.error('Error uploading container image:', error);
        this.isUploading = false;
      }
    });
  }

    /**
   * Removes the selected image and resets the file input.
   */
  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

    /**
   * Sends a request to create a new container.
   */
  private createContainer(): void {
    const containerPayload = { ...this.newContainer };

    console.log('Creating Container:', containerPayload);

    this.containerService.createContainer(containerPayload).subscribe({
      next: (response) => {
        console.log('Container created successfully:', response);
        this.router.navigate(['/container']);
      },
      error: (error) => {
        console.error('Error creating container:', error.error);
      }
    });
  }

    /**
   * Navigates back to the previous page.
   */
  goBack(): void {
    this.location.back(); // Navigate to the previous page in history
  }

    /**
   * Opens the file input dialog.
   */
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

}
