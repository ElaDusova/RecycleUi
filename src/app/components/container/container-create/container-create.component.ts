import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContainerService } from '../../../services/container.service';
import { ContainerCreate } from '../../../models/container/container-create.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './container-create.component.html',
  styleUrls: ['./container-create.component.scss']
})
export class ContainerCreateComponent {

  protected isSubmitting = signal<boolean>(false);
  protected successMessage = signal<string | null>(null);
  protected errorMessage = signal<string | null>(null);

  selectedFile: File | null = null;
  isUploading: boolean = false;
  imagePreview: string | null = null;

  constructor(private location: Location, private containerService: ContainerService, private router: Router) {}

  protected availableTypes: string[] = ['Plastic', 'Glass', 'Metal', 'Paper', 'Cartons', 'Electronics', 'Bio', 'CommunalTrash', 'Textile', 'Collection Yard'];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  protected newContainer: ContainerCreate = {
    name: '',
    description: '',
    picturePath: null,
    type: 'Plastic', // Default
  };


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
    onSubmit(): void {
    this.newContainer;

    if (this.selectedFile) {
      this.uploadImage();
    } else {
      this.createContainer();
    }
  }

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

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
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

  goBack(): void {
    this.location.back(); // Navigate to the previous page in history
  }
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

}
