import { EventEmitter } from '@angular/core';
import { SystemModuleRoadAreaDetailsMapAMapPolygonController } from '../system-module-road-area-details-map-amap-polygon.controller';

export class SystemModuleRoadAreaDetailsMapAMapEditorController {
  change = new EventEmitter<[number, number][]>();

  constructor(
    private map: AMap.Map,
    private polygon: SystemModuleRoadAreaDetailsMapAMapPolygonController
  ) {}

  private editor?: AMap.PolygonEditor;
  private target?: AMap.Polygon;
  open() {
    // 重复 open 之前先收掉旧的，避免残留一个没 close 的控件
    this.close();
    this.target = this.polygon.get();
    if (this.target) {
      this.editor = new AMap.PolygonEditor(this.map, this.target);
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

  private regist(editor: AMap.PolygonEditor) {
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
