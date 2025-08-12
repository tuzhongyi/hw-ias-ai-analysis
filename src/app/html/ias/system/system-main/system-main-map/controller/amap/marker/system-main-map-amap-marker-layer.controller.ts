import { IShop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { IASMapAMapConfig } from '../../../../../../share/map/controller/amap/ias-map-amap.config';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapMarkerLabelController } from '../../../../../../share/map/controller/amap/marker/ias-map-amap-marker-label.controller';
import { IASMapAMapMarkerEvent } from '../../../../../../share/map/controller/amap/marker/ias-map-amap-marker.model';

export class SystemMainMapAMapMarkerLayerController {
  event = new IASMapAMapMarkerEvent();

  constructor(map: AMap.Map) {
    this.layer = this.init(map);
    this.info = new IASMapAMapInfoController(map);
  }

  private layer: AMap.LabelsLayer;
  private info: IASMapAMapInfoController;
  private points: IASMapAMapMarkerLabelController[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: IASMapAMapConfig.icon.zooms,
    });
    map.add(layer);
    return layer;
  }

  private regist(point: IASMapAMapMarkerLabelController) {
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
      this.info.add(info, undefined, [0, -SizeTool.map.shop.height * 0.7]);
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
        let point = new IASMapAMapMarkerLabelController(data);
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
    let info: IIASMapAMapInfo = {
      Name: data.Name,
    };
    if (data.Location) {
      info.Location = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
    }
    this.info.add(info, undefined, [0, -50]);
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
}
