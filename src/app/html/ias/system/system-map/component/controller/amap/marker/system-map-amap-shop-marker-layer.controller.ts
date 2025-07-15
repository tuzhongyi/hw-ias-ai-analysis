import { IShop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemMapAMapConfig } from '../system-map-amap.config';
import { SystemAMapShopInfoController } from './system-map-amap-shop-info.controller';
import { SystemAMapShopLabelMarkerController } from './system-map-amap-shop-marker.controller';
import {
  ISystemAMapShopLabelMarkerController,
  SystemAMapShopMarkerEvent,
} from './system-map-amap-shop-marker.model';

export class SystemAMapShopMarkerLayerController {
  event = new SystemAMapShopMarkerEvent();

  constructor(map: AMap.Map) {
    this.zoom = map.getZoom();
    this.layer = this.init(map);
    this.info = new SystemAMapShopInfoController(map);
  }

  private layer: AMap.LabelsLayer;
  private info: SystemAMapShopInfoController;
  private points: ISystemAMapShopLabelMarkerController[] = [];
  private zoom: number;

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
      this.info.add(data, this.zoom);
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

  async load(datas: IShop[]) {
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
    return markers;
  }

  clear() {
    this.layer.clear();
    this.points = [];
  }

  mouseover(data: IShop) {
    this.info.add(data, this.zoom);
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.hover();
    }
  }
  mouseout(data: IShop) {
    this.info.remove();
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.out();
    }
  }

  select(data: IShop) {
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

  set = {
    zoom: (zoom: number) => {
      this.zoom = zoom;
      this.info.set.offset(zoom);
    },
  };
}
