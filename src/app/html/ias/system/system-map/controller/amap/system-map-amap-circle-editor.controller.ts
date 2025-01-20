import { EventEmitter } from '@angular/core';
import { SystemAMapCircleController } from './system-map-amap-circle.controller';

export class SystemAMapCircleEditorEvent {
  change = new EventEmitter<number>();
  move = new EventEmitter<number[]>();
}
export class SystemAMapCircleEditorController {
  event = new SystemAMapCircleEditorEvent();
  constructor(private map: any) {
    this.circle = new SystemAMapCircleController(map);
  }
  private editor?: AMap.CircleEditor;
  public circle: SystemAMapCircleController;

  open() {
    let circle = this.circle.get();
    if (circle) {
      this.editor = new AMap.CircleEditor(this.map, circle);
      this.regist(this.editor);
      this.editor.open();
    }
  }

  close() {
    if (this.editor) {
      this.editor.close();
    }
  }

  set(radius: number) {
    this.circle.set(radius);
    this.close();
    this.open();
  }

  private regist(editor: AMap.CircleEditor) {
    editor.on('adjust', (e: any) => {
      this.event.change.emit(e.target.getRadius());
    });
    editor.on('move', (e: any) => {
      let center = e.target.getCenter();
      this.event.move.emit([center.lng, center.lat]);
    });
    this.circle.event.move.subscribe((x) => {
      this.event.move.emit(x);
    });
    this.circle.event.change.subscribe((x) => {
      this.event.change.emit(x);
    });
  }
}
