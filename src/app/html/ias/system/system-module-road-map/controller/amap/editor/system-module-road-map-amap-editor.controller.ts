import { SystemModuleRoadMapAMapPolylineController } from '../system-module-road-map-amap-polyline.controller';

export class SystemModuleRoadMapAMapEditorController {
  constructor(
    private map: AMap.Map,
    private polyline: SystemModuleRoadMapAMapPolylineController
  ) {}

  private editor?: AMap.PolylineEditor;
  private target?: AMap.Polyline;
  open(id: string) {
    this.target = this.polyline.get(id);
    if (this.target) {
      this.editor = new AMap.PolylineEditor(this.map, this.target);
      this.editor.open();
    }
  }

  close() {
    if (this.editor) {
      this.editor.setTarget(this.target);
      this.editor.close();
      this.target = undefined;
      this.editor = undefined;
    }
  }
}
