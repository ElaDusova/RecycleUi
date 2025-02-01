import { Component, input } from '@angular/core';
import { ContainerDetail } from '../../models/container/container-detail.interface';
import { CommonModule } from '@angular/common';
import { ContainerDetailComponent } from "../../components/container/container-detail/container-detail.component";

@Component({
  selector: 'app-container.detail-page',
  standalone: true,
  imports: [CommonModule, ContainerDetailComponent],
  templateUrl: './container.detail-page.component.html',
  styleUrl: './container.detail-page.component.scss'
})
export class ContainerDetailPageComponent {
  readonly container = input.required<ContainerDetail>();
}
