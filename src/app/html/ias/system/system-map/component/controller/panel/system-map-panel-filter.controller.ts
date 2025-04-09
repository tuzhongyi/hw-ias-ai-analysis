import { EventEmitter, Injectable } from '@angular/core';
import { SystemMapPanel } from '../../system-map.model';
import { SystemMapPanelEditorCircleGettingController } from './system-map-panel-editor-circle-getting.controller';

@Injectable()
export class SystemMapPanelFilterController extends SystemMapPanel {
  load = new EventEmitter<void>();

  constructor(public getting: SystemMapPanelEditorCircleGettingController) {
    super();
  }

  ondistance() {
    this.show = false;
    this.getting.show = true;
  }

  onsearch() {
    this.show = false;
    this.load.emit();
  }
}
