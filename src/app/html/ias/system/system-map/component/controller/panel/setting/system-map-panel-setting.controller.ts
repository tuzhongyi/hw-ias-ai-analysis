import { Injectable } from '@angular/core';
import { SystemMapPanelSettingCompareController } from './system-map-panel-setting-compare.controller';

@Injectable()
export class SystemMapPanelSettingController {
  constructor(public compare: SystemMapPanelSettingCompareController) {}
}
