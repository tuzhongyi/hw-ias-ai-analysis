import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { IASMapAMapConfig } from '../../../../share/map/controller/amap/ias-map-amap.config';

@Component({
  selector: 'ias-system-module-mobile-device-route-map-patrol-state',
  imports: [CommonModule, TextSpaceBetweenDirective],
  templateUrl:
    './system-module-mobile-device-route-map-patrol-state.component.html',
  styleUrl:
    './system-module-mobile-device-route-map-patrol-state.component.less',
})
export class SystemModuleMobileDeviceRouteMapPatrolStateComponent {
  Colors = IASMapAMapConfig.section.color;
}
