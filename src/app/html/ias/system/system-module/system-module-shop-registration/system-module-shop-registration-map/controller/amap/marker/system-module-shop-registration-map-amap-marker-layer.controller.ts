import { IShop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemAMapShopInfoController } from '../../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-info.controller';
import {
  SystemModuleShopRegistrationMapAMapMarkerController,
  SystemModuleShopRegistrationMapAMapMarkerEvent,
} from './system-module-shop-registration-map-amap-marker.controller';

export class SystemModuleShopRegistrationMapAMapMarkerLayerController {
  event = new SystemModuleShopRegistrationMapAMapMarkerEvent();
  constructor(private map: AMap.Map) {
    this.zoom = map.getZoom();
    this.info = new SystemAMapShopInfoController(map);
  }

  private info: SystemAMapShopInfoController;
  private points: SystemModuleShopRegistrationMapAMapMarkerController[] = [];
  private zoom: number;

  private regist(point: SystemModuleShopRegistrationMapAMapMarkerController) {
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
    point.event.dragging.subscribe((data) => {
      if (data.Location) {
        let position: [number, number] = [
          data.Location.Longitude,
          data.Location.Latitude,
        ];
        this.info.set.position(position);
      }
    });
    point.event.dragend.subscribe((data) => {
      if (data.Location) {
        let position: [number, number] = [
          data.Location.Longitude,
          data.Location.Latitude,
        ];
        this.info.set.position(position);
        this.event.dragend.emit(data);
      }
    });
  }
  async load(datas: IShop[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point = new SystemModuleShopRegistrationMapAMapMarkerController(
          data
        );
        this.regist(point);
        markers.push(point.marker);
        this.points.push(point);
      }
    }
    this.map.add(markers);
    return markers;
  }

  clear() {
    let markers = this.points.map((x) => x.marker);
    this.map.remove(markers);
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
    position: (data: IShop) => {
      let point = this.points.find((x) => x.data.Id === data.Id);
      if (point && data.Location) {
        let position: [number, number] = [
          data.Location.Longitude,
          data.Location.Latitude,
        ];

        point.move(position);
        this.info.set.position(position);
      }
    },
  };
}
