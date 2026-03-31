import { EventEmitter } from '@angular/core';

export class SystemAMapCircleEvent {
  change = new EventEmitter<number>();
  move = new EventEmitter<number[]>();
}

export class SystemAMapCircleController {
  event = new SystemAMapCircleEvent();
  constructor(private map: AMap.Map) {}
  private circle?: AMap.Circle;

  private option: AMap.CircleOptions = {
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
  };

  create(args?: { radius?: number; center?: [number, number] }) {
    let center = this.map.getCenter();
    this.circle = new AMap.Circle({
      ...this.option,
      center: args?.center ?? [center.lng, center.lat], // 圆心位置
      radius: args?.radius ?? 100, //半径
    });
    this.map.add(this.circle);
    this.map.setFitView([this.circle]);
    if (!args?.center) {
      this.event.move.emit([center.lng, center.lat]);
    }
    if (!args?.radius) {
      this.event.change.emit(100);
    }

    return this.circle;
  }

  set(args: { radius?: number; center?: [number, number] }) {
    if (this.circle) {
      if (args.radius) {
        this.circle.setRadius(args.radius);
      }
      if (args.center) {
        this.circle.setCenter(args.center);
      }
    }
  }
  get() {
    return this.circle;
  }

  remove() {
    if (this.circle) {
      this.map.remove(this.circle);
      this.circle = undefined;
    }
  }

  select() {
    if (this.circle) {
      let option = {
        ...this.option,
        fillColor: '#FF0000',
      };
      this.circle.setOptions(option);
    }
  }
  blur() {
    if (this.circle) {
      this.circle.setOptions(this.option);
    }
  }
}
