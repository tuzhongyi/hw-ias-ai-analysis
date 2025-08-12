import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ObjectTool } from '../../../../../../../../../common/tools/object-tool/object.tool';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';
import { IASMapAMapInfoController } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { SystemEventMapContainerAMapMarkerController } from './system-event-map-container-amap-marker.controller';

export class SystemEventMapContainerAMapMarkerLayerController {
  event = {
    click: new EventEmitter<MobileEventRecord>(),
  };
  constructor(map: AMap.Map, private info: IASMapAMapInfoController) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private points: SystemEventMapContainerAMapMarkerController[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: IASMapAMapConfig.icon.zooms,
    });
    map.add(layer);
    return layer;
  }

  private regist(point: SystemEventMapContainerAMapMarkerController) {
    point.event.mouseover.subscribe((data) => {
      let info: IIASMapAMapInfo = {
        Name: ObjectTool.model.MobileEventRecord.get.name(data),
      };
      if (data.Location) {
        info.Location = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
      }
      this.info.add(info, undefined, [0, -30]);
    });
    point.event.mouseout.subscribe((data) => {
      this.info.remove();
    });
    point.event.click.subscribe((data) => {
      this.event.click.emit(data);
    });
  }
  async load(datas: MobileEventRecord[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point = new SystemEventMapContainerAMapMarkerController(data);
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
  mouseover(data: MobileEventRecord) {
    let info: IIASMapAMapInfo = {
      Name: ObjectTool.model.MobileEventRecord.get.name(data),
    };
    if (data.Location) {
      info.Location = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
    }
    this.info.add(info, undefined, [0, -30]);
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.hover();
    }
  }
  mouseout(data: MobileEventRecord) {
    this.info.remove();
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.out();
    }
  }
  select(data: MobileEventRecord) {
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
    position: (data: MobileEventRecord) => {
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
  };
}
