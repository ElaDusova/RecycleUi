import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialService } from '../../../services/material.service';
import { ContainerService } from '../../../services/container.service';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MaterialCreate } from '../../../models/material/material-create';
import { ContainerSimple } from '../../../models/container/container-simple.interface';

@Component({
  selector: 'app-material-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './material-create.component.html',
  styleUrl: './material-create.component.scss'
})
export class MaterialCreateComponent implements OnInit {
  protected materialService = inject(MaterialService);
  protected containerService = inject(ContainerService);
  protected isSubmitting = signal<boolean>(false);
  protected successMessage = signal<string | null>(null);
  protected errorMessage = signal<string | null>(null);
  protected availableTypes: string[] = [
    'Plastic', 'Glass', 'Metal', 'Paper', 'Cartons',
    'Electronics', 'Bio', 'CommunalTrash', 'Textile', 'Collection Yard'
  ];
  protected availableContainers: ContainerSimple[] = [];
  protected filteredContainers: ContainerSimple[] = [];
  protected containerDropdownOpen = signal<boolean>(false);
  protected containerSearchQuery = signal<string>('');

  protected newMaterial: MaterialCreate = {
    name: '',
    description: '',
    trashCanIds: []
  };

  constructor(private location: Location) {}

  async ngOnInit() {
    try {
      this.availableContainers = await lastValueFrom(this.containerService.getContainers());
      this.filteredContainers = [...this.availableContainers]; // Initialize filtered list
    } catch (error) {
      this.errorMessage.set("Error fetching containers.");
    }
  }

  filterContainers() {
    const query = this.containerSearchQuery().toLowerCase();
    this.filteredContainers = this.availableContainers.filter(container =>
      container.name.toLowerCase().includes(query)
    );
  }

  toggleContainerDropdown() {
    this.containerDropdownOpen.set(!this.containerDropdownOpen());
  }

  selectContainer(container: ContainerSimple) {
if (!this.newMaterial.trashCanIds.some(c => c === container.id)) {
      this.newMaterial.trashCanIds.push(container.id as any);
    }
  }

  removeContainer(containerId: string) {
    this.newMaterial.trashCanIds = this.newMaterial.trashCanIds.filter(
      c => c !== containerId
    );
  }
    getContainerName(containerId: string): string {
    console.log(containerId);
    const container = this.availableContainers.find(c => c.id === containerId);
    console.log(container);
    return container ? container.name : 'Unknown';
  }

  async addMaterial() {
    if (!this.newMaterial.name.trim()) {
      this.errorMessage.set("Material name is required!");
      return;
    }

    console.log("Payload sent to backend:", JSON.stringify(this.newMaterial, null, 2)); // Debugging

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
    this.location.back();
  }
}
