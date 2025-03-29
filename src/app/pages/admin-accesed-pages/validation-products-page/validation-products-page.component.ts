import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { PartService } from '../../../services/part.service';
import { MaterialService } from '../../../services/material.service';
import { MaterialDetail } from '../../../models/material/material-detail';
import { CommonModule, Location } from '@angular/common';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Operation } from 'fast-json-patch';
import { ProductPartUpdate } from '../../../models/part/part-product-update';
import { ProductUpdate } from '../../../models/product/product-update.inerface';
import { PartCreate } from '../../../models/part/part-create';
import { MaterialSimple } from '../../../models/part/part-simple.interface';

@Component({
  selector: 'app-validation-products-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './validation-products-page.component.html',
  styleUrls: ['./validation-products-page.component.scss']
})
export class ValidationProductsPageComponent implements OnInit {
  private productService = inject(ProductService);
  private partService = inject(PartService);
  private materialService = inject(MaterialService);
  private router = inject(Router);

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  products$: BehaviorSubject<ProductUpdate[]> = new BehaviorSubject<ProductUpdate[]>([]); // ✅ Use ProductUpdate
  products: ProductUpdate[] = [];
  parts$: BehaviorSubject<ProductPartUpdate[]> = new BehaviorSubject<ProductPartUpdate[]>([]);
  materials$: BehaviorSubject<MaterialDetail[]> = new BehaviorSubject<MaterialDetail[]>([]);

  selectedProduct: ProductUpdate | null = null;
  selectedParts: ProductPartUpdate[] = [];
  errorMessage: string | null = null;

  materialSearchQuery: string = '';
  searchQuery: string = '';
  protected availableParts: ProductPartUpdate[] = [];
  filteredParts: ProductPartUpdate[] = [];
  allParts: ProductPartUpdate[] = [];
  protected newPart: PartCreate = {
    name: '',
    description: '',
    picturePath: null,
    type: 'Wrapping',
    materialId: ''
  };
  protected availableMaterials: MaterialSimple[] = [];
  protected selectedMaterial: MaterialSimple | null = null;
  protected filteredMaterials: MaterialSimple[] = [];
  protected materialDropdownOpen: boolean = false;
  protected modalOpen: boolean = false;
  protected partDropdownOpen: boolean = false;
  constructor(private location: Location) {};


  selectedFile: File | null = null;
  isUploading: boolean = false;
  imagePreview: string | null = null;

  protected product: ProductUpdate = {
    id: '',
    name: '',
    ean: '',
    description: '',
    isVerified: false,
    picturePath: '',
    parts: []
  };

  ngOnInit(): void {
    this.fetchUnverifiedProducts();
    this.fetchParts();
    this.fetchMaterials();
  }

  fetchUnverifiedProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products
          .filter(product => product.isVerified === false)
          .map(product => ({
            id: product.id,
            name: product.name,
            ean: product.ean,
            description: product.description,
            isVerified: product.isVerified,
            picturePath: product.picturePath,
            partIds: product.parts ? product.parts.map(part => part.id) : [],
            parts: product.parts ?? [], // 🔧 přidáno, aby odpovídalo ProductUpdate
          }) as ProductUpdate);

        this.products$.next(this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.errorMessage = 'Failed to load products';
      }
    });
  }

openModal(): void {
  this.modalOpen = true;
}
goBack(): void {
  this.location.back();
}
  fetchParts(): void {
    this.partService.getParts().subscribe({
      next: (parts) => {
        this.parts$.next(parts);
      },
      error: (err) => {
        console.error('Error fetching parts:', err);
        this.errorMessage = 'Failed to load parts';
      }
    });
  }
  convertToPartUpdate(part: ProductPartUpdate): ProductPartUpdate {
    return {
      id: part.id,
      name: part.name,
    };
  }
  selectPart(part: ProductPartUpdate): void {
    if (!this.selectedParts.some(p => p.id === part.id)) {
      this.selectedParts.push(part);
      this.product.parts.push(part.id);
    }
  }
  selectMaterial(material: MaterialSimple): void {
  this.selectedMaterial = material;
  this.newPart.materialId = material.id;
  this.materialDropdownOpen = false;
}
fetchMaterials(): void {
  this.materialService.getMaterials().subscribe({
    next: (materials) => {
      this.availableMaterials = materials.map(material => ({
        id: material.id,
        name: material.name,
        trashCans: []
      }));
      this.filteredMaterials = [...this.availableMaterials];
    },
    error: (err) => console.error('Error fetching materials:', err)
  });
}

filterMaterials(): void {
  if (!this.availableMaterials) return;

  this.filteredMaterials = this.availableMaterials.filter(material =>
    material.name.toLowerCase().includes(this.materialSearchQuery.toLowerCase())
  );
}
toggleMaterialDropdown(): void {
  this.materialDropdownOpen = true;
}
removeMaterial(): void {
  this.selectedMaterial = null;
  this.newPart.materialId = '';
}
trackById(index: number, item: { id: string }): string {
  return item.id;
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

  ngAfterViewInit(): void {
    if (!this.fileInput) {
      console.error('fileInput is not available after view initialization.');
    }
  }

  triggerFileInput(): void {
    if (!this.fileInput || !this.fileInput.nativeElement) {
      console.error("File input is not initialized yet.");
      return;
    }
    this.fileInput.nativeElement.click();
  }
  openEditModal(product: ProductUpdate): void {
    this.selectedProduct = { ...product }; // ✅ Ensure we clone the product object

    this.partService.getParts().subscribe(parts => {
      this.allParts = parts;
      this.filteredParts = [...parts];
    });
  }
  removeImage(): void {
    this.imagePreview = null; // Remove image preview
    this.selectedFile = null; // Reset selected file

    // Reset the file input field so the same file can be selected again
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  closeModal(): void {
    this.selectedProduct = null;
    this.selectedParts = [];
  }
  toggleDropdown(): void {
    this.partDropdownOpen = true;
  }
  filterParts(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredParts = this.availableParts.filter(part => part.name.toLowerCase().includes(query));
  }
  addPart(part: PartCreate): void {
    if (!part.name.trim() || !part.materialId) {
      console.error("Error: Name and Material are required.");
      return;
    }

    this.partService.createPart(part).subscribe({
      next: (createdPart) => {
        console.log("Part created successfully", createdPart);
      },
      error: (err) => console.error("Error creating part:", err)
    });
  }

  removePart(part: ProductPartUpdate): void {
    this.selectedParts = this.selectedParts.filter(p => p.id !== part.id);

    if (this.selectedProduct) {
      this.selectedProduct.parts = this.selectedProduct.parts.filter(id => id !== part.id);
    }
  }

  saveChanges(): void {
    if (!this.selectedProduct) return;

    const patch: Operation[] = [];

    if (this.selectedProduct.name) {
      patch.push({ op: 'replace', path: '/name', value: this.selectedProduct.name });
    }
    if (this.selectedProduct.description) {
      patch.push({ op: 'replace', path: '/description', value: this.selectedProduct.description });
    }
    if (this.selectedProduct.ean) {
      patch.push({ op: 'replace', path: '/ean', value: this.selectedProduct.ean });
    }

    // ✅ The backend automatically sets isVerified = true, so we don't need to send it

    this.productService.updateProduct(this.selectedProduct.id, patch).subscribe({
      next: () => {
        this.fetchUnverifiedProducts();
        this.closeModal();
      },
      error: (err) => {
        console.error('Error updating product:', err);
        this.errorMessage = 'Failed to update product.';
      }
    });
  }


  verifyProduct(product: ProductUpdate): void {
    this.selectedProduct = { ...product };
  }
    onSubmit(): void {
    if (this.selectedProduct) {
      this.saveChanges(); // ✅ Update product instead of creating a new one
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
      },
      error: (error) => {
        console.error('Error uploading product image:', error);
        this.isUploading = false;
      }
    });
  }
  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.fetchUnverifiedProducts(),
        error: (err) => console.error('Error deleting product:', err)
      });
    }
  }
}
