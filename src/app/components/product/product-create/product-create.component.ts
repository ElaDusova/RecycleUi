import { Component, ElementRef, inject, ViewChild, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductCreate } from '../../../models/product/product-create.interface';
import { Router } from '@angular/router';
import { PartService } from '../../../services/part.service';
import { MaterialService } from '../../../services/material.service';
import { MaterialSimple } from '../../../models/material/material-simple';
import { PartCreate } from '../../../models/part/part-create';
import { PartDetail } from '../../../models/part/part-detail';
import { FormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { validEAN13 } from '../../../validators/ean-validator';

/**
 * Component for creating a new product.
 * Supports adding parts, selecting materials, and uploading images.
 */
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

  protected newPart: PartCreate = {
    name: '',
    description: '',
    picturePath: null,
    type: 'Wrapping',
    materialId: '',
  };

  protected availableParts: PartDetail[] = [];
  protected filteredParts: PartDetail[] = [];
  protected selectedParts: PartDetail[] = [];
  protected searchQuery: string = '';

  isChecksumValid = true;
  eanControl = new FormControl('', [validEAN13]);

  protected availableMaterials: MaterialSimple[] = [];
  protected filteredMaterials: MaterialSimple[] = [];
  protected selectedMaterial: MaterialSimple | null = null;
  protected materialSearchQuery: string = '';
  protected materialDropdownOpen: boolean = false;

  protected availablePartTypes: string[] = ['Wrapping', 'Part'];

  protected dropdownOpen: boolean = false;
  protected modalOpen: boolean = false;

  selectedFile: File | null = null;
  isUploading: boolean = false;
  imagePreview: string | null = null;

  constructor(private location: Location, private productService: ProductService, private router: Router) {}

  private partService = inject(PartService);
  private materialService = inject(MaterialService);
  private elementRef = inject(ElementRef);

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

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
    this.location.back();
  }
  checkChecksum(): void {
    const ean = this.product.ean;

    if (!/^\d{13}$/.test(ean)) {
      this.isChecksumValid = true;
      return;
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = parseInt(ean[i], 10);
      sum += (i % 2 === 0) ? digit : digit * 3;
    }

    const calculatedCheck = (10 - (sum % 10)) % 10;
    const actualCheck = parseInt(ean[12], 10);
    this.isChecksumValid = calculatedCheck === actualCheck;

  }
  onEANInputChange(rawValue: string): void {
    const cleaned = rawValue.replace(/\s+/g, ''); // remove all spaces
    this.product.ean = cleaned;
    this.checkChecksum(); // run checksum on cleaned value
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

  //  Select only one Material
  selectMaterial(material: MaterialSimple): void {
    this.selectedMaterial = material; //  Store the selected material
    this.newPart.materialId = material.id; //  Assign single materialId
    this.materialDropdownOpen = false;
  }

  removeMaterial(): void {
    this.selectedMaterial = null;
    this.newPart.materialId = ''; // Reset MaterialId
  }

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.newPart = { name: '', description: '', picturePath: null, type: 'Wrapping', materialId: '' };
    this.selectedMaterial = null;
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

      const newPartDetail: PartDetail = {
        id: createdPart.id,
        name: createdPart.name,
        description: createdPart.description,
        picturePath: createdPart.picturePath,
        type: createdPart.type,
        isVerified: createdPart.isVerified,
        trashCans: [],
        material: createdPart.material
      };

      this.availableParts.push(newPartDetail);
      this.filteredParts = [...this.availableParts];

      this.selectPart(newPartDetail);

      this.closeModal();

    } catch (error) {
      console.error("Error creating part:", error);
    }
  }

  onSubmit(): void {
    this.product.isVerified = false;

    if (this.selectedFile) {
      this.uploadImage();
    } else {
      this.createProduct();
    }
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      console.error('No file selected for upload.');
      return;
    }

    this.isUploading = true;

    this.productService.uploadProductImage(this.selectedFile).subscribe({
      next: (uploadResponse) => {
        console.log('Product image uploaded successfully:', uploadResponse.imagePath);
        this.product.picturePath = uploadResponse.imagePath;
        this.isUploading = false;
        this.createProduct();
      },
      error: (error) => {
        console.error('Error uploading product image:', error);
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
  /**
   * Creates a new product.
   */
  private createProduct(): void {
    const productPayload = { ...this.product };

    console.log('Creating Product:', productPayload);

    this.productService.createProduct(productPayload).subscribe({
      next: (response) => {
        console.log('Product created successfully:', response);
        this.router.navigate(['/product-search']);
      },
      error: (error) => {
        console.error('Error creating product:', error.error);
      }
    });
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
      this.product.partIds.push(part.id);
    }
  }
  /**
   * Removes a selected part.
   * @param part The part to remove.
   */
  removePart(part: PartDetail): void {
    this.selectedParts = this.selectedParts.filter(p => p.id !== part.id);
    this.product.partIds = this.product.partIds.filter(id => id !== part.id);
  }

  filterParts(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredParts = this.availableParts.filter(part => part.name.toLowerCase().includes(query));
  }
}
