import { Injectable } from '@angular/core';
import { SystemModuleRoadMapAMapController } from './amap/system-module-road-map-amap.controller';

@Injectable()
export class SystemModuleRoadMapController {
  constructor(private amap: SystemModuleRoadMapAMapController) {}
}
