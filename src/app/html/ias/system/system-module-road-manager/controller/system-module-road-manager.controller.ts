import { Injectable } from '@angular/core';
import { SystemModuleRoadManagerInfoController } from './system-module-road-manager-info.controller';

@Injectable()
export class SystemModuleRoadManagerController {
  constructor(public info: SystemModuleRoadManagerInfoController) {}
}
