import { Injectable } from '@angular/core';
import { SystemModuleRoadSectionManagerInfoController } from './system-module-road-section-manager-info.controller';

@Injectable()
export class SystemModuleRoadSectionManagerController {
  constructor(public info: SystemModuleRoadSectionManagerInfoController) {}
}
