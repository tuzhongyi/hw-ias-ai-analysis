import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ias-system-task-file-details-map-panel-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-task-file-details-map-panel-settings.component.html',
  styleUrl: './system-task-file-details-map-panel-settings.component.less',
})
export class SystemTaskFileDetailsMapPanelSettingsComponent {
  @Input() rectified: boolean = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();
  @Input() videomultiple = false;
  @Input() videosync = true;
  @Output() videosyncChange = new EventEmitter<boolean>();

  @Input() pickupvisible = false;
  @Input() pickupable = false;
  @Output() pickupableChange = new EventEmitter<boolean>();

  @Input() top = true;
  @Input() left = false;

  on = {
    rectified: () => {
      this.rectifiedChange.emit(this.rectified);
    },
    video: {
      sync: () => {
        this.videosyncChange.emit(this.videosync);
      },
    },
    pickup: {
      enabled: () => {
        this.pickupableChange.emit(this.pickupable);
      },
    },
  };
}
