import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerView } from '../../../models/container/container-view.interface';

/**
 * Displays a single container item in a list.
 */
@Component({
  selector: 'app-container',
  imports: [CommonModule],
  templateUrl: './container-list.component.html',
  styleUrl: './container-list.component.scss'
})

  /**
   * The container data to display in the list.
   */
export class ContainerListComponent {
  @Input() container!: ContainerView;
}
