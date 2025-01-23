import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerView } from '../../../models/container/container-view.interface';
import { RouterModule } from '@angular/router';
import { ContainerService } from '../../../services/container.service';

@Component({
  selector: 'app-container-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './container-list-page.component.html',
  styleUrl: './container-list-page.component.scss'
})
export class ContainerListPageComponent implements OnInit {
  containers: ContainerView[] = [];

  constructor(private containerService: ContainerService) {}

  ngOnInit(): void {
    this.containerService.getContainers().subscribe({
      next: (data) => (this.containers = data),
      error: (err) => console.error('Error fetching containers:', err),
    });
  }
}
