import { MaterialDetail } from './../../../models/material/material-detail';
import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../../services/material.service';

@Component({
  selector: 'app-material-delete',
  templateUrl: './material-delete.component.html',
  styleUrl: './material-delete.component.scss',
  standalone: true,
  imports: []
})
export class MaterialDeleteComponent implements OnInit {
  materials: MaterialDetail[] = [];

  constructor(private materialService: MaterialService) {}

  ngOnInit(): void {
    this.fetchMaterials();
  }

  fetchMaterials(): void {
    this.materialService.getMaterials().subscribe({
      next: (materials) => this.materials = materials,
      error: (err) => console.error('Failed to fetch materials:', err)
    });
  }

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this material?')) return;

    this.materialService.deleteMaterial(id).subscribe({
      next: () => this.materials = this.materials.filter(m => m.id !== id),
      error: (err) => console.error('Failed to delete material:', err)
    });
  }
}
