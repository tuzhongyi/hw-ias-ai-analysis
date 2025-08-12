import { IShop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { IASMapAMapInfoController } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { SystemModuleShopRegistrationMapAMapMarkerEvent } from '../marker/system-module-shop-registration-map-amap-marker.controller';
import { SystemModuleShopRegistrationMapAMapChangedController } from './system-module-shop-registration-map-amap-changed.controller';

export class SystemModuleShopRegistrationMapAMapChangedLayerController {
  event = new SystemModuleShopRegistrationMapAMapMarkerEvent();
  constructor(private map: AMap.Map, private info: IASMapAMapInfoController) {}
  private points: SystemModuleShopRegistrationMapAMapChangedController[] = [];

  private regist(point: SystemModuleShopRegistrationMapAMapChangedController) {
    point.event.mouseover.subscribe((data) => {
      let info: IIASMapAMapInfo = {
        Name: data.Name,
      };
      if (data.Location) {
        info.Location = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
      }
      this.info.add(info);
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
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
        this.info.set.position(position);
      }
    });
    point.event.dragend.subscribe((data) => {
      if (data.Location) {
        let position: [number, number] = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
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
        let point = new SystemModuleShopRegistrationMapAMapChangedController(
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
  add(data: IShop) {
    if (data.Location) {
      let point = new SystemModuleShopRegistrationMapAMapChangedController(
        data
      );
      this.regist(point);
      this.points.push(point);
      this.map.add([point.marker]);
    }
  }
  remove(data: IShop) {
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      this.map.remove([point.marker]);
      this.points = this.points.filter((x) => x.data.Id !== data.Id);
      this.info.remove();
    }
  }

  mouseover(data: IShop) {
    let info: IIASMapAMapInfo = {
      Name: data.Name,
    };
    if (data.Location) {
      info.Location = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
    }
    this.info.add(info);
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
    position: (data: IShop) => {
      let point = this.points.find((x) => x.data.Id === data.Id);
      if (point && data.Location) {
        let position: [number, number] = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
        point.data = data;
        point.move(position);
        this.info.set.position(position);
      }
    },
    location: async (datas: IShop[]) => {
      let markers: AMap.Marker[] = await this.load(datas);
      this.map.setFitView(markers, false);
    },
  };
}
