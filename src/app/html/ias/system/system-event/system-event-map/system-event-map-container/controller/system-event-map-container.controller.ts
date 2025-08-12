import { Injectable } from '@angular/core';
import { SystemEventMapContainerAMapController } from './amap/system-event-map-container-amap.controller';

@Injectable()
export class SystemEventMapContainerController {
  amap = new SystemEventMapContainerAMapController();
}
