import { Component, OnInit } from '@angular/core';
import { PartService } from '../../../services/part.service';
import { PartDetail } from '../../../models/part/part-detail';

@Component({
  selector: 'app-part-delete',
  templateUrl: './part-delete.component.html',
  styleUrls: ['./part-delete.component.scss'],
})
export class PartDeleteComponent implements OnInit {
  parts: PartDetail[] = [];
  errorMessage: string | null = null;

  constructor(private partService: PartService) {}

  ngOnInit(): void {
    this.loadParts();
  }

  loadParts(): void {
    this.partService.getParts().subscribe({
      next: (response) => {
        this.parts = response;
      },
      error: (err) => {
        console.error('Failed to load parts:', err);
        this.errorMessage = 'Unable to load parts.';
      },
    });
  }

  deletePart(id: string): void {
    if (!confirm('Are you sure you want to delete this part?')) return;

    this.partService.deletePart(id).subscribe({
      next: () => {
        this.parts = this.parts.filter((p) => p.id !== id);
      },
      error: (err) => {
        console.error('Failed to delete part:', err);
        this.errorMessage = 'Error deleting part.';
      },
    });
  }
}
