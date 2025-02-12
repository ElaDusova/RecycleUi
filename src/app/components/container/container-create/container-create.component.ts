import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContainerService } from '../../../services/container.service';
import { ContainerCreate } from '../../../models/container/container-create.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-container-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './container-create.component.html',
  styleUrl: './container-create.component.scss'
})
export class ContainerCreateComponent {
  protected containerService = inject(ContainerService);

  protected isSubmitting = signal<boolean>(false);
  protected successMessage = signal<string | null>(null);
  protected errorMessage = signal<string | null>(null);

  protected availableTypes: string[] = ['Plastic', 'Glass', 'Metal', 'Paper', 'Cartons', 'Electronics', 'Bio', 'CommunalTrash', 'Textile'];

  protected newContainer: ContainerCreate = {
    id: '',
    name: '',
    description: '',
    picturePath: null,
    Type: 'Plastic', // Default
  };

  /**
   * Handles file selection
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.newContainer.picturePath = input.files[0].name;
    }
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
      id: crypto.randomUUID(),
      name: this.newContainer.name.trim(),
      description: this.newContainer.description?.trim() || "No description",
      picturePath: this.newContainer.picturePath || null,
      Type: this.newContainer.Type,
    };

    this.isSubmitting.set(true);
    this.successMessage.set(null);
    this.errorMessage.set(null);

    try {
      await lastValueFrom(this.containerService.createContainer(containerToCreate));
      this.successMessage.set("Container created successfully!");
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse && error.error?.errors) {
        this.errorMessage.set(Object.values(error.error.errors).join(', '));
      } else {
        this.errorMessage.set("Error creating container. Please try again.");
      }
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
