import { EventEmitter } from '@angular/core';

export class SystemAMapCircleEvent {
  change = new EventEmitter<number>();
  move = new EventEmitter<number[]>();
}

export class SystemAMapCircleController {
  event = new SystemAMapCircleEvent();
  constructor(private map: any) {}
  private circle?: AMap.Circle;
  private editor?: AMap.CircleEditor;

  create() {
    let center = this.map.getCenter();
    this.circle = new AMap.Circle({
      center: [center.lng, center.lat], // 圆心位置
      radius: 100, //半径
      borderWeight: 3,
      strokeColor: '#FF33FF',
      strokeWeight: 6,
      strokeOpacity: 0.2,
      fillOpacity: 0.4,
      strokeStyle: 'dashed',
      strokeDasharray: [10, 10],
      // 线样式还支持 'dashed'
      fillColor: '#1791fc',
      zIndex: 50,
    });
    this.map.add(this.circle);
    this.map.setFitView([this.circle]);
    this.event.move.emit([center.lng, center.lat]);
    this.event.change.emit(100);
  }

  set(radius: number) {
    if (this.circle) {
      this.circle.setRadius(radius);
      this.close();
      this.open();
    }
  }

  open() {
    this.editor = new AMap.CircleEditor(this.map, this.circle);
    this.regist(this.editor);
    this.editor.open();
  }
  remove() {
    if (this.circle) {
      this.map.remove(this.circle);
    }
  }
  close() {
    if (this.editor) {
      this.editor.close();
    }
  }

  private regist(editor: AMap.CircleEditor) {
    editor.on('adjust', (e: any) => {
      this.event.change.emit(e.target.getRadius());
    });
    editor.on('move', (e: any) => {
      let center = e.target.getCenter();
      this.event.move.emit([center.lng, center.lat]);
    });
  }
}
