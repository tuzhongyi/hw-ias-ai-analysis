import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ias-system-module-road-object-video-map-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './system-module-road-object-video-map-settings.component.html',
  styleUrl: './system-module-road-object-video-map-settings.component.less',
})
export class SystemModuleRoadObjectVideoMapSettingsComponent {
  @Input() rectified: boolean = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();
  @Input() pickupvisible = false;
  @Input() pickupable = false;
  @Output() pickupableChange = new EventEmitter<boolean>();

  @Input() displaypoint = true;
  @Output() displaypointChange = new EventEmitter<boolean>();

  @Input() displayline = true;
  @Output() displaylineChange = new EventEmitter<boolean>();

  @Input() displayroute = true;
  @Output() displayrouteChange = new EventEmitter<boolean>();

  @Input() top = true;
  @Input() left = false;

  on = {
    rectified: () => {
      this.rectifiedChange.emit(this.rectified);
    },
    display: {
      point: () => {
        this.displaypointChange.emit(this.displaypoint);
      },
      line: () => {
        this.displaylineChange.emit(this.displayline);
      },
      route: () => {
        this.displayrouteChange.emit(this.displayroute);
      },
    },
    pickup: {
      enabled: () => {
        this.pickupableChange.emit(this.pickupable);
      },
    },
  };
}
