import { Component, Input } from '@angular/core';
import { ContainerDetail } from '../../../models/container/container-detail.interface';
import { CommonModule } from '@angular/common';

/**
 * Displays detailed information about a container.
 */
@Component({
  selector: 'app-container-detail',
  imports: [CommonModule],
  templateUrl: './container-detail.component.html',
  styleUrl: './container-detail.component.scss'
})

  /**
   * The container data to display.
   */
export class ContainerDetailComponent {
  @Input() container!: ContainerDetail;
}
