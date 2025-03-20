import { Component, Input } from '@angular/core';
import { ContainerDetail } from '../../../models/container/container-detail.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container-detail',
  imports: [CommonModule],
  templateUrl: './container-detail.component.html',
  styleUrl: './container-detail.component.scss'
})
export class ContainerDetailComponent {
  @Input() container!: ContainerDetail;
}
