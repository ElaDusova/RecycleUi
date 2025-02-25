import { Component, ElementRef, inject, ViewChild, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductCreate } from '../../../models/product/product-create.interface';
import { Router } from '@angular/router';
import { PartService } from '../../../services/part.service';
import { MaterialService } from '../../../services/material.service';
import { MaterialSimple } from '../../../models/material/material-simple';
import { PartCreate } from '../../../models/part/part-create';
import { PartDetail } from '../../../models/part/part-detail';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class ProductCreateComponent implements OnInit {

  protected product: ProductCreate = {
    name: '',
    ean: '',
    description: '',
    isVerified: false,
    picturePath: null,
    partIds: []
  };

  protected availableParts: PartDetail[] = [];
  protected filteredParts: PartDetail[] = [];
  protected selectedParts: PartDetail[] = [];
  protected searchQuery: string = '';

  protected availableMaterials: MaterialSimple[] = [];
  protected filteredMaterials: MaterialSimple[] = [];
  protected selectedMaterials: MaterialSimple[] = [];
  protected materialSearchQuery: string = '';
  protected materialDropdownOpen: boolean = false;

  protected availablePartTypes: string[] = ['Wrapping', 'Part'];

  protected dropdownOpen: boolean = false;
  protected modalOpen: boolean = false;
  constructor(private location: Location) {}

  protected newPart: PartCreate = {
    name: '',
    description: '',
    picturePath: null,
    type: 'Wrapping',
    partMaterials: []
  };

  private productService = inject(ProductService);
  private partService = inject(PartService);
  private materialService = inject(MaterialService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @HostListener('document:click', ['$event'])
  closeDropdownOnOutsideClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.materialDropdownOpen = false;
    }
  }
  ngOnInit(): void {
    this.fetchParts();
    this.fetchMaterials();
  }

  goBack(): void {
    this.location.back(); // Navigate to the previous page in history
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

  selectMaterial(material: MaterialSimple): void {
    if (!this.selectedMaterials.some(m => m.id === material.id)) {
      this.selectedMaterials.push(material); // ✅ Store full object, not just string
      this.newPart.partMaterials.push({ materialId: material.id });
      this.materialDropdownOpen = false;
    }
  }

  removeMaterial(material: MaterialSimple): void {
    this.selectedMaterials = this.selectedMaterials.filter(m => m.id !== material.id);
    this.newPart.partMaterials = this.newPart.partMaterials.filter(m => m.materialId !== material.id);
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.newPart = { name: '', description: '', picturePath: null, type: 'Wrapping', partMaterials: [] };
    this.selectedMaterials = [];
  }

  async addPart() {
    if (!this.newPart.name.trim()) return;

    const partToCreate: PartCreate = {
      name: this.newPart.name,
      description: this.newPart.description || "Auto-created part",
      picturePath: this.newPart.picturePath || null,
      type: this.newPart.type || "default",
      partMaterials: this.selectedMaterials.map(material => ({ materialId: material.id })) // ✅ Correct type
    };

    try {
      const createdPart = await this.partService.createPart(partToCreate).toPromise();

      if (!createdPart) {
        console.error("Error: Backend did not return a valid part.");
        return;
      }

      const newPartDetail: PartDetail = {
        id: createdPart.id,
        name: createdPart.name,
        description: createdPart.description,
        picturePath: createdPart.picturePath,
        type: createdPart.type,
        isVerified: createdPart.isVerified,
        partMaterials: this.selectedMaterials.map(material => material.id) // ✅ Convert to string[]
      };

      this.availableParts.push(newPartDetail);
      this.selectedParts.push(newPartDetail);
      this.product.partIds.push(newPartDetail.id);
      this.closeModal();
    } catch (error) {
      console.error("Error creating part:", error);
    }
  }
  onSubmit(): void {
    // Ensure isVerified is explicitly set to false
    this.product.isVerified = false;

    // Log the payload to see what's being sent
    console.log('Creating Product:', this.product);

    this.productService.createProduct(this.product).subscribe({
      next: () => {
        this.router.navigate(['/product-search']); // Redirect after success
      },
      error: (error) => {
        console.error('Error creating product:', error);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      this.product.picturePath = URL.createObjectURL(file);
    }
  }

  triggerPartFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  onPartImageSelected(event: any): void {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.newPart.picturePath = reader.result as string; // Store the image as a base64 string
      };

      reader.readAsDataURL(file); // Convert the file to base64
    }
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectPart(part: PartDetail): void {
    if (!this.selectedParts.some(p => p.id === part.id)) {
      this.selectedParts.push(part);
      this.product.partIds.push(part.id);
    }
  }
  removePart(part: PartDetail): void {
    this.selectedParts = this.selectedParts.filter(p => p.id !== part.id);
    this.product.partIds = this.product.partIds.filter(id => id !== part.id);
  }
  filterParts(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredParts = this.availableParts.filter(part => part.name.toLowerCase().includes(query));
  }
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
