import { MobileDevice } from '../../../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapMarkerEvent } from '../../../../../../share/map/controller/amap/marker/ias-map-amap-marker.model';
import { SystemMainMapAMapDeviceMarkerController } from './system-main-map-amap-device-marker.controller';

export class SystemMainMapAMapDeviceMarkerLayerController {
  event = new IASMapAMapMarkerEvent<MobileDevice>();

  constructor(map: AMap.Map, private info: IASMapAMapInfoController) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private points: SystemMainMapAMapDeviceMarkerController[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: [0, 50],
    });
    map.add(layer);
    return layer;
  }

  private regist(point: SystemMainMapAMapDeviceMarkerController) {
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
      this.info.add(info, undefined, [0, -SizeTool.map.shop.height]);
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
    point.event.dblclick.subscribe((data) => {
      this.select(data);
      this.event.dblclick.emit(data);
    });
  }

  async load(datas: MobileDevice[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point = new SystemMainMapAMapDeviceMarkerController(data);
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

  mouseover(data: MobileDevice) {
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
  mouseout(data: MobileDevice) {
    this.info.remove();
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.out();
    }
  }

  select(data: MobileDevice) {
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
