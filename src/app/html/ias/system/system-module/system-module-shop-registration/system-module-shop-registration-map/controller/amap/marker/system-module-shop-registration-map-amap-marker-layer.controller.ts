import { IShop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemAMapShopInfoController } from '../../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-info.controller';
import { ISystemAMapShopMarkerInfo } from '../../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-marker.model';
import {
  SystemModuleShopRegistrationMapAMapMarkerController,
  SystemModuleShopRegistrationMapAMapMarkerEvent,
} from './system-module-shop-registration-map-amap-marker.controller';

export class SystemModuleShopRegistrationMapAMapMarkerLayerController {
  event = new SystemModuleShopRegistrationMapAMapMarkerEvent();
  constructor(
    private map: AMap.Map,
    private info: SystemAMapShopInfoController
  ) {
    this.zoom = map.getZoom();
  }

  private points: SystemModuleShopRegistrationMapAMapMarkerController[] = [];
  private zoom: number;
  private draggable = false;
  private removable = false;

  private regist(point: SystemModuleShopRegistrationMapAMapMarkerController) {
    point.event.mouseover.subscribe((data) => {
      let info: ISystemAMapShopMarkerInfo = {
        Name: data.Name,
      };
      if (data.Location) {
        info.Location = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
      }
      this.info.add(info, this.zoom);
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
    point.event.remove.subscribe((data) => {
      this.remove(data);
      this.event.remove.emit(data);
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
  add(data: IShop) {
    if (data.Location) {
      let point = new SystemModuleShopRegistrationMapAMapMarkerController(data);
      point.draggable = this.draggable;
      point.removable = this.removable;
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
    let info: ISystemAMapShopMarkerInfo = {
      Name: data.Name,
    };
    if (data.Location) {
      info.Location = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
    }
    this.info.add(info, this.zoom);
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
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
        point.data = data;
        point.move(position);
        this.info.set.position(position);
      }
    },
    draggable: (enabled: boolean) => {
      this.draggable = enabled;
      this.points.forEach((x) => {
        x.draggable = enabled;
      });
    },
    removable: (enabled: boolean) => {
      this.removable = enabled;
      this.points.forEach((x) => {
        x.removable = enabled;
      });
    },
  };
}
