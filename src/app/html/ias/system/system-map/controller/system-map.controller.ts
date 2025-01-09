import { Injectable } from '@angular/core';
import { SystemAMapController } from './system-map-amap.controller';

@Injectable()
export class SystemMapController {
  constructor(public amap: SystemAMapController) {}
}
