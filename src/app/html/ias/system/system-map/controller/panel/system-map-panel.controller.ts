import { Injectable } from '@angular/core';
import { SystemMapPanelDetailsController } from './details/system-map-panel-details.controller';
import { SystemMapPanelSettingController } from './setting/system-map-panel-setting.controller';
import { SystemMapPanelControlsController } from './system-map-panel-controls.controller';
import { SystemMapPanelEditorController } from './system-map-panel-editor.controller';
import { SystemMapPanelFilterController } from './system-map-panel-filter.controller';
import { SystemMapPanelPositionController } from './system-map-panel-position.controller';
import { SystemMapPanelSearchController } from './system-map-panel-search.controller';
import { SystemMapPanelSourceController } from './system-map-panel-source.controller';
import { SystemMapPanelStateController } from './system-map-panel-state.controller';
import { SystemMapPanelStatisticController } from './system-map-panel-statistic.controller';
import { SystemMapPanelTaskController } from './system-map-panel-task.controller';

@Injectable()
export class SystemMapPanelController {
  constructor(
    public state: SystemMapPanelStateController,
    public position: SystemMapPanelPositionController,
    public source: SystemMapPanelSourceController,
    public details: SystemMapPanelDetailsController,
    public editor: SystemMapPanelEditorController,
    public filter: SystemMapPanelFilterController,
    public statistic: SystemMapPanelStatisticController,
    public search: SystemMapPanelSearchController,
    public controls: SystemMapPanelControlsController,
    public task: SystemMapPanelTaskController,
    public setting: SystemMapPanelSettingController
  ) {}
}
