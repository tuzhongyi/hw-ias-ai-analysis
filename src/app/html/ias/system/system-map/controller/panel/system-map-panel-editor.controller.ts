import { Injectable } from '@angular/core';
import { SystemMapPanelEditorCircleController } from './system-map-panel-editor-circle.controller';

@Injectable()
export class SystemMapPanelEditorController {
  constructor(public circle: SystemMapPanelEditorCircleController) {}
}
