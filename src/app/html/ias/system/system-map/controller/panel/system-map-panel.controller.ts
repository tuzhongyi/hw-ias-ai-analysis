import { Injectable } from '@angular/core';
import { SystemMapPanelControlsController } from './system-map-panel-controls.controller';
import { SystemMapPanelDetailsController } from './system-map-panel-details.controller';
import { SystemMapPanelEditorController } from './system-map-panel-editor.controller';
import { SystemMapPanelFilterController } from './system-map-panel-filter.controller';
import { SystemMapPanelPositionController } from './system-map-panel-position.controller';
import { SystemMapPanelSearchController } from './system-map-panel-search.controller';
import { SystemMapPanelSourceController } from './system-map-panel-source.controller';
import { SystemMapPanelStateController } from './system-map-panel-state.controller';
import { SystemMapPanelStatisticController } from './system-map-panel-statistic.controller';

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
    public controls: SystemMapPanelControlsController
  ) {}
}
