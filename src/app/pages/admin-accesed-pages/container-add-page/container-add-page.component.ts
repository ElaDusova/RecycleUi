import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContainerCreate } from '../../../models/container/container-create.interface';
import { ContainerDetail } from '../../../models/container/container-detail.interface';
import { ContainerService } from '../../../services/container.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-container-add-page',
  imports: [FormsModule, CommonModule],
  templateUrl: './container-add-page.component.html',
  styleUrl: './container-add-page.component.scss'
})
export class ContainerAddPageComponent {
  protected readonly fb = inject(FormBuilder);
  protected containerService = inject(ContainerService);
  private router = inject(Router);

  protected form!: FormGroup;
  protected selectedFile = signal<File | null>(null);
  protected isSubmitting = signal<boolean>(false);
  protected successMessage = signal<string | null>(null);
  protected errorMessage = signal<string | null>(null);

  protected availableContainers: ContainerDetail[] = [];
  protected filteredContainers: ContainerDetail[] = [];
  protected selectedContainers: ContainerDetail[] = [];
  protected searchQuery: string = '';
  protected modalOpen: boolean = false;

  // Available can types
  protected availableCanTypes: string[] = [
    'Plastic', 'Glass', 'Metal', 'Paper', 'Cartons',
    'Electronics', 'Bio', 'CommunalTrash', 'Textile'
  ];

  protected newContainer: ContainerCreate = {
    id: '',
    name: '',
    description: '',
    picturePath: null,
    canType: '',
  };

  fileInput: any;

  /**
   * Opens the modal for adding a new container
   */
  openModal(): void {
    this.modalOpen = true;
  }

  /**
   * Closes the modal and resets the form
   */
  closeModal(): void {
    this.modalOpen = false;
    this.newContainer = {
      id: '',
      name: '',
      description: '',
      picturePath: null,
      canType: '',
    };
  }

  /**
   * Handles file selection
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);

      // Store file path for backend
      this.newContainer.picturePath = input.files[0].name;
    }
  }

  /**
   * Triggers the file input click
   */
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  /**
   * Sends the new container data to the API
   */
  async addContainer() {
    if (!this.newContainer.name.trim()) {
      this.errorMessage.set("Container name is required!");
      return;
    }

    const containerToCreate: ContainerCreate = {
      id: crypto.randomUUID(), // Generate unique ID
      name: this.newContainer.name,
      description: this.newContainer.description || "Auto-created container",
      picturePath: this.newContainer.picturePath || null,
      canType: this.newContainer.canType || "default",
    };

    this.isSubmitting.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      // Send data to backend
      const createdContainer = await lastValueFrom(this.containerService.createContainer(containerToCreate));

      if (!createdContainer) {
        throw new Error("Backend did not return a valid response.");
      }

      // Update UI with new container
      this.availableContainers.push(createdContainer);
      this.selectedContainers.push(createdContainer);

      // Show success message
      this.successMessage.set("Container created successfully!");

      // Close modal and reset form
      this.closeModal();

    } catch (error) {
      console.error("Error creating container:", error);
      this.errorMessage.set("Error creating container. Please try again.");
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
