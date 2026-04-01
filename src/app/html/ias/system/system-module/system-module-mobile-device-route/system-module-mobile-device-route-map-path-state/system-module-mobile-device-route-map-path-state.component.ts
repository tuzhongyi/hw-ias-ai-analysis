import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { IASMapAMapConfig } from '../../../../share/map/controller/amap/ias-map-amap.config';

@Component({
  selector: 'ias-system-module-mobile-device-route-map-path-state',
  imports: [CommonModule, TextSpaceBetweenDirective],
  templateUrl:
    './system-module-mobile-device-route-map-path-state.component.html',
  styleUrl: './system-module-mobile-device-route-map-path-state.component.less',
})
export class SystemModuleMobileDeviceRouteMapPathStateComponent {
  @Input() precision?: boolean;
  @Output() precisionChange = new EventEmitter<boolean>();

  state = {
    normal: true,
    high: true,
  };
  Colors = IASMapAMapConfig.path.color;

  on = {
    normal: () => {
      this.state.normal = !this.state.normal;
      if (!this.state.normal) {
        this.state.high = true;
      }
      this.on.change();
    },
    high: () => {
      this.state.high = !this.state.high;
      if (!this.state.high) {
        this.state.normal = true;
      }
      this.on.change();
    },
    change: () => {
      if (this.state.normal && this.state.high) {
        this.precision = undefined;
      } else if (this.state.normal) {
        this.precision = false;
      } else if (this.state.high) {
        this.precision = true;
      } else {
        this.precision = undefined;
      }

      this.precisionChange.emit(this.precision);
    },
  };
}
