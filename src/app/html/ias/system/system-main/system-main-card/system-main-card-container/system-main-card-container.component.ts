import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SystemMainCardHeadComponent } from '../system-main-card-head/system-main-card-head.component';

@Component({
  selector: 'ias-system-main-card-container',
  imports: [CommonModule, SystemMainCardHeadComponent],
  templateUrl: './system-main-card-container.component.html',
  styleUrl: './system-main-card-container.component.less',
})
export class SystemMainCardContainerComponent {
  @Input() title: string = '';
}
