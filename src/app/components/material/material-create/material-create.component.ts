import { Component, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialService } from '../../../services/material.service';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialCreate } from '../../../models/material/material-create';

@Component({
  selector: 'app-material-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './material-create.component.html',
  styleUrl: './material-create.component.scss'
})
export class MaterialCreateComponent {
  protected materialService = inject(MaterialService);

  protected isSubmitting = signal<boolean>(false);
  protected successMessage = signal<string | null>(null);
  protected errorMessage = signal<string | null>(null);

  constructor(private location: Location) {}

  protected newMaterial: MaterialCreate = {
    name: '',
    description: '',
    trashCanMaterials: []
  };

  async addMaterial() {
    if (!this.newMaterial.name.trim()) {
      this.errorMessage.set("Material name is required!");
      return;
    }

    try {
      await lastValueFrom(this.materialService.createMaterial(this.newMaterial));
      this.successMessage.set("Material created successfully!");
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse && error.error?.errors) {
        this.errorMessage.set(Object.values(error.error.errors).join(', '));
      } else {
        this.errorMessage.set("Error creating material. Please try again.");
      }
    } finally {
      this.isSubmitting.set(false);
    }
  }
  goBack(): void {
    this.location.back(); // Navigate to the previous page in history
  }

}
