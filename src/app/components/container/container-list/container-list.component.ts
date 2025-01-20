import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerView } from '../../../models/container/container-view.interface';

@Component({
  selector: 'app-container',
  imports: [CommonModule],
  templateUrl: './container-list.component.html',
  styleUrl: './container-list.component.scss'
})
export class ContainerListComponent {
  @Input() container!: ContainerView;
}
