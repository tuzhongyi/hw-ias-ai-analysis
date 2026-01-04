import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'howell-system-module-mobile-device-route-map-settings',
  imports: [CommonModule, FormsModule],
  templateUrl:
    './system-module-mobile-device-route-map-settings.component.html',
  styleUrl: './system-module-mobile-device-route-map-settings.component.less',
})
export class SystemModuleMobileDeviceRouteMapSettingsComponent {
  @Input() rectified: boolean = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();

  @Input() top = true;
  @Input() left = false;

  on = {
    rectified: () => {
      this.rectifiedChange.emit(this.rectified);
    },
  };
}
