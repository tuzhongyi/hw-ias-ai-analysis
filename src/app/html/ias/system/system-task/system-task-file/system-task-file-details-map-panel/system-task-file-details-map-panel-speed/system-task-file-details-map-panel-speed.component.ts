import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-system-task-file-details-map-panel-speed',
  imports: [CommonModule],
  templateUrl: './system-task-file-details-map-panel-speed.component.html',
  styleUrl: './system-task-file-details-map-panel-speed.component.less',
})
export class SystemTaskFileDetailsMapPanelSpeedComponent {
  @Input() speed = 0;
}
