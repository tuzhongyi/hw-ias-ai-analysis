import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ias-system-task-route-map-panel-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-task-route-map-panel-settings.component.html',
  styleUrl: './system-task-route-map-panel-settings.component.less',
})
export class SystemTaskRouteMapPanelSettingsComponent {
  @Input() rectified: boolean = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();

  on = {
    rectified: () => {
      this.rectifiedChange.emit(this.rectified);
    },
  };
}
