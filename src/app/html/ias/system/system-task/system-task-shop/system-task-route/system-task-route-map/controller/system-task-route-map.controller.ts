import { Injectable } from '@angular/core';
import { SystemTaskRouteMapAMapController } from './amap/system-task-route-map-amap.controller';

@Injectable()
export class SystemTaskRouteMapController {
  constructor(public amap: SystemTaskRouteMapAMapController) {}
}
