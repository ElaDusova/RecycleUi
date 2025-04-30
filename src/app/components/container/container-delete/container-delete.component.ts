import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerService } from '../../../services/container.service';
import { ContainerView } from '../../../models/container/container-view.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-container-delete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './container-delete.component.html',
  styleUrl: './container-delete.component.scss'
})
export class ContainerDeleteComponent implements OnInit {
  containers: ContainerView[] = [];
  errorMessage: string | null = null;

  constructor(private containerService: ContainerService) {}

  ngOnInit(): void {
    this.loadContainers();
  }

  loadContainers(): void {
    this.containerService.getContainers().subscribe({
      next: (data) => this.containers = data,
      error: (err) => this.errorMessage = 'Failed to load containers.'
    });
  }

  deleteContainer(id: string): void {
    if (confirm('Are you sure you want to delete this container?')) {
      this.containerService.deleteContainer(id).subscribe({
        next: () => this.loadContainers(),
        error: (err) => this.errorMessage = 'Failed to delete container.'
      });
    }
  }
}
