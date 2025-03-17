import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapAMapConfig } from '../system-map-amap.config';
import { SystemAMapShopInfoController } from './system-map-amap-shop-info.controller';
import {
  SystemAMapShopLabelMarkerController,
  SystemAMapShopMarkerEvent,
} from './system-map-amap-shop-marker.controller';

export class SystemAMapShopMarkerLayerController {
  event = new SystemAMapShopMarkerEvent();

  constructor(map: AMap.Map) {
    this.layer = this.init(map);
    this.info = new SystemAMapShopInfoController(map);
  }

  private layer: AMap.LabelsLayer;
  private info: SystemAMapShopInfoController;
  private points: SystemAMapShopLabelMarkerController[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: SystemMapAMapConfig.icon.zooms,
    });
    map.add(layer);
    return layer;
  }

  private regist(point: SystemAMapShopLabelMarkerController) {
    point.event.mouseover.subscribe((data) => {
      this.info.add(data);
      this.event.mouseover.emit(data);
    });
    point.event.mouseout.subscribe((data) => {
      this.info.remove();
      this.event.mouseout.emit(data);
    });
    point.event.click.subscribe((data) => {
      this.select(data);
      this.event.click.emit(data);
    });
  }

  async load(datas: Shop[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point = new SystemAMapShopLabelMarkerController(data);
        this.regist(point);
        markers.push(point.marker);
        this.points.push(point);
      }
    }
    this.layer.add(markers);
  }

  clear() {
    this.layer.clear();
    this.points = [];
  }

  mouseover(data: Shop) {
    this.info.add(data);
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.hover();
    }
  }
  mouseout(data: Shop) {
    this.info.remove();
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.out();
    }
  }

  select(data: Shop) {
    this.blur();
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.select();
    }
  }

  blur() {
    this.points.forEach((x) => {
      if (x.selected) {
        x.blur();
      }
    });
  }
}
