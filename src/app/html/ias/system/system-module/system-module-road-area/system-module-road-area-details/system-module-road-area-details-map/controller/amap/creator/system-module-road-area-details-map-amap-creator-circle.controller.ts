import { EventEmitter } from '@angular/core';

export class SystemModuleRoadAreaDetailsMapAMapCreatorCircleController {
  remove = new EventEmitter<[number, number]>();
  /**
   * 顶点上的右键。顶点是 CircleMarker，覆盖物事件默认不冒泡到地图
   * （bubble 默认 false），而「右键收尾」是挂在地图的 rightclick 上的，
   * 所以右键落在顶点上时地图根本收不到 —— 得由顶点自己转出去。
   * 不能给顶点加 bubble: true 了事：那样左键点顶点会既触发删除、
   * 又冒泡成地图 click 再补一个点进来。
   */
  rightclick = new EventEmitter<void>();

  constructor(private map: AMap.Map) {}

  private circles: AMap.CircleMarker[] = [];

  create(position: [number, number]) {
    const circle = new AMap.CircleMarker({
      center: position,
      radius: 7,
      strokeColor: '#F33',
      strokeWeight: 2,
      strokeOpacity: 0.5,
      fillColor: '#ee2200',
      fillOpacity: 0.5,
      zIndex: 10,
      cursor: 'pointer',
    });
    this.map.add(circle);
    this.circles.push(circle);
    this.regist(circle);
  }

  clear() {
    for (let i = 0; i < this.circles.length; i++) {
      this.map.remove(this.circles[i]);
    }
    this.circles = [];
  }

  private regist(circle: AMap.CircleMarker) {
    circle.on('click', (e) => {
      this.onclick(e);
    });
    circle.on('rightclick', () => {
      this.rightclick.emit();
    });
    circle.on('mouseover', (e) => {
      let circle = e.target;
      circle.setOptions({ strokeColor: '#3f3', fillColor: '#00ee22' });
    });
    circle.on('mouseout', (e) => {
      let circle = e.target;
      circle.setOptions({ strokeColor: '#F33', fillColor: '#ee2200' });
    });
  }

  private onremove(item: AMap.CircleMarker) {
    let index = this.circles.indexOf(item);
    if (index > -1) {
      this.map.remove(this.circles[index]);
      this.circles.splice(index, 1);
    }
    let lnglat = item.getCenter();
    this.remove.emit([lnglat.lng, lnglat.lat]);
  }

  private onclick(e: any) {
    let circle = e.target;
    this.onremove(circle);
  }
}
