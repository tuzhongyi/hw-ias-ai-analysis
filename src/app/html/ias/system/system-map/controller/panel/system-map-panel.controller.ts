import { Injectable } from '@angular/core';
import { SystemAMapController } from '../amap/system-map-amap.controller';
import { SystemMapPanelDetailsController } from './system-map-panel-details.controller';
import { SystemMapPanelEditorController } from './system-map-panel-editor.controller';
import { SystemMapPanelPositionController } from './system-map-panel-position.controller';
import { SystemMapPanelSourceController } from './system-map-panel-source.controller';
import { SystemMapPanelStateController } from './system-map-panel-state.controller';

@Injectable()
export class SystemMapPanelController {
  constructor(
    private amap: SystemAMapController,
    public state: SystemMapPanelStateController,
    public position: SystemMapPanelPositionController,
    public source: SystemMapPanelSourceController,
    public details: SystemMapPanelDetailsController,
    public editor: SystemMapPanelEditorController
  ) {
    this.init();
  }

  init() {
    this.state.show = true;
    this.regist();
  }

  private regist() {
    this.editor.circle.change.subscribe((show) => {
      this.state.show = !show;
      this.source.show = false;

      if (show) {
        this.amap.radius.open();
      } else {
        this.amap.radius.close();
      }
    });
    this.source.change.subscribe((show) => {
      this.state.show = true;
      this.editor.circle.show = false;
    });
  }
}
