import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-system-map-panel-head',
  imports: [CommonModule],
  templateUrl: './system-map-panel-head.component.html',
  styleUrl: './system-map-panel-head.component.less',
})
export class SystemMapPanelHeadComponent {
  @Input() title: string = '';
  @Input() operation = false;
}
