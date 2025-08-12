import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-system-main-card-head',
  imports: [CommonModule],
  templateUrl: './system-main-card-head.component.html',
  styleUrl: './system-main-card-head.component.less',
})
export class SystemMainCardHeadComponent {
  @Input() title: string = '';
}
