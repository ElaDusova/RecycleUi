import { Component, ElementRef, inject, ViewChild, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { PartCreate } from '../../../models/part/part-create';
import { PartDetail } from '../../../models/part/part-detail';
import { MaterialSimple } from '../../../models/part/part-simple.interface';
import { PartService } from '../../../services/part.service';
import { MaterialService } from '../../../services/material.service';
import { Router } from '@angular/router';

/**
 * Component for creating a new part.
 * Allows users to define part details, upload images, and select materials.
 */
@Component({
  selector: 'app-part-create',
  templateUrl: './part-create.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class PartCreateComponent {

    /** Stores form data for new part creation. */
  protected newPart: PartCreate = {
    name: '',
    description: '',
    picturePath: null,
    type: 'Wrapping',
    materialId: '',
  };
  constructor(private location: Location, private router: Router) {}

  protected availableParts: PartDetail[] = [];
  protected filteredParts: PartDetail[] = [];
  protected selectedParts: PartDetail[] = [];
  protected searchQuery: string = '';

  protected availableMaterials: MaterialSimple[] = [];
  protected filteredMaterials: MaterialSimple[] = [];
  protected selectedMaterial: MaterialSimple | null = null;
  protected materialSearchQuery: string = '';
  protected materialDropdownOpen: boolean = false;
  protected dropdownOpen: boolean = false;

  protected availablePartTypes: string[] = ['Wrapping', 'Part'];

  selectedFile: File | null = null;
  isUploading: boolean = false;
  imagePreview: string | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting: boolean = false;

  private partService = inject(PartService);
  private materialService = inject(MaterialService);
  private elementRef = inject(ElementRef);

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

    /**
   * Closes dropdown when clicking outside.
   */
  @HostListener('document:click', ['$event'])
  closeDropdownOnOutsideClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.materialDropdownOpen = false;
    }
  }

    /**
   * Navigates back to the previous page.
   */
  goBack(): void {
    this.location.back();
  }
    /**
   * Initializes component data.
   */
  ngOnInit(): void {
    this.fetchParts();
    this.fetchMaterials();
  }

  fetchParts(): void {
    this.partService.getParts().subscribe({
      next: (parts) => {
        this.availableParts = parts;
        this.filteredParts = parts;
      },
      error: (error) => {
        console.error('Error fetching parts:', error);
      }
    });
  }

  fetchMaterials(): void {
    this.materialService.getMaterials().subscribe({
      next: (materials) => {
        this.availableMaterials = materials;
        this.filteredMaterials = materials;
      },
      error: (error) => {
        console.error('Error fetching materials:', error);
      }
    });
  }

  toggleMaterialDropdown(): void {
    this.materialDropdownOpen = true;
  }

  filterMaterials(): void {
    this.filteredMaterials = this.availableMaterials.filter(material =>
      material.name.toLowerCase().includes(this.materialSearchQuery.toLowerCase())
    );
  }
  /**
   * Selects a material for the part.
   * @param material The selected material.
   */
  selectMaterial(material: MaterialSimple): void {
    this.selectedMaterial = material;
    this.newPart.materialId = material.id;
    this.materialDropdownOpen = false;
  }

  removeMaterial(): void {
    this.selectedMaterial = null;
    this.newPart.materialId = '';
  }

  async addPart() {
    if (!this.newPart.name.trim() || !this.newPart.materialId) {
      console.error("Error: Name and Material are required.");
      return;
    }

    const partToCreate: PartCreate = {
      name: this.newPart.name,
      description: this.newPart.description || "Auto-created part",
      picturePath: this.newPart.picturePath || null,
      type: this.newPart.type || "default",
      materialId: this.newPart.materialId
    };

    try {
      const createdPart = await this.partService.createPart(partToCreate).toPromise();

      if (!createdPart) {
        console.error("Error: Backend did not return a valid part.");
        return;
      }


      // Clear the form after creating the part
      this.resetForm();

      // Set success message
      this.successMessage = "Part created successfully!";

      // Optionally, clear success message after 5 seconds
      setTimeout(() => {
        this.successMessage = null;
      }, 5000);

    } catch (error) {
      this.errorMessage = "Error creating part: " + error;
      console.error("Error creating part:", error);
    }
  }

  // Reset form fields after successful part creation
  resetForm(): void {
    this.newPart = {
      name: '',
      description: '',
      picturePath: null,
      type: 'Wrapping',
      materialId: '',
    };
    this.selectedMaterial = null;
    this.materialSearchQuery = '';
  }

    /**
   * Handles file selection for image upload.
   * @param event File input event.
   */
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

  removeImage(): void {
    this.imagePreview = null;
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  triggerFileInput(): void {
    if (!this.fileInput || !this.fileInput.nativeElement) {
      console.error("File input is not initialized yet.");
      return;
    }
    this.fileInput.nativeElement.click();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

    /**
   * Selects a part to be added.
   * @param part The selected part.
   */
  selectPart(part: PartDetail): void {
    if (!this.selectedParts.some(p => p.id === part.id)) {
      this.selectedParts.push(part);
    }
  }

    /**
   * Removes a selected part.
   * @param part The part to remove.
   */
  removePart(part: PartDetail): void {
    this.selectedParts = this.selectedParts.filter(p => p.id !== part.id);
  }

  filterParts(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredParts = this.availableParts.filter(part => part.name.toLowerCase().includes(query));
  }
}
