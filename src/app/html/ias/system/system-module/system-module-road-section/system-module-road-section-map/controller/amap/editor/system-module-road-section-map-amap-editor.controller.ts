import { EventEmitter } from '@angular/core';
import { SystemModuleRoadSectionMapAMapPolylineController } from '../system-module-road-section-map-amap-polyline.controller';

export class SystemModuleRoadSectionMapAMapEditorController {
  change = new EventEmitter<[number, number][]>();

  constructor(
    private map: AMap.Map,
    private polyline: SystemModuleRoadSectionMapAMapPolylineController
  ) {}

  private editor?: AMap.PolylineEditor;
  private target?: AMap.Polyline;
  open(id: string) {
    this.target = this.polyline.get(id);
    if (this.target) {
      this.editor = new AMap.PolylineEditor(this.map, this.target);
      this.regist(this.editor);
      this.editor.open();
    }
  }

  close() {
    if (this.editor) {
      this.editor.setTarget(this.target);
      this.editor.close();
      this.editor = undefined;
      this.target = undefined;
    }
  }

  private getnodes() {
    let datas: [number, number][] = [];
    let path = this.target?.getPath();
    if (path) {
      for (let i = 0; i < path.length; i++) {
        const point = path[i] as AMap.LngLat;
        datas.push([point.lng, point.lat]);
      }
    }
    return datas;
  }

  private regist(editor: AMap.PolylineEditor) {
    editor.on('addnode', (e) => {
      let nodes = this.getnodes();
      this.change.emit(nodes);
    });
    editor.on('removenode', (e) => {
      let nodes = this.getnodes();
      this.change.emit(nodes);
    });
    editor.on('adjust', (e) => {
      let nodes = this.getnodes();
      this.change.emit(nodes);
    });
  }
}
