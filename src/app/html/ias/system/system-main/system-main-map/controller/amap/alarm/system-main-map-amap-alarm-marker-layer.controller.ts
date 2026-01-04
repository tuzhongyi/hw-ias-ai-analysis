import { Subscription } from 'rxjs';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ObjectTool } from '../../../../../../../../common/tools/object-tool/object.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapMarkerEvent } from '../../../../../../share/map/controller/amap/marker/ias-map-amap-marker.model';
import { SystemMainMapAMapAlarmMarkerController } from './system-main-map-amap-alarm-marker.controller';

export class SystemMainMapAMapAlarmMarkerLayerController {
  event = new IASMapAMapMarkerEvent<MobileEventRecord>();

  constructor(
    map: AMap.Map,
    private info: IASMapAMapInfoController,
    private timeout: boolean,
    private subscription: Subscription
  ) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private points: SystemMainMapAMapAlarmMarkerController[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: [0, 50],
      zIndex: 115,
    });
    map.add(layer);
    return layer;
  }

  private regist(
    point: SystemMainMapAMapAlarmMarkerController,
    subscription: Subscription
  ) {
    let sub1 = point.event.mouseover.subscribe((data) => {
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
    subscription.add(sub1);
    let sub2 = point.event.mouseout.subscribe((data) => {
      this.info.remove();
      this.event.mouseout.emit(data);
    });
    subscription.add(sub2);
    let sub3 = point.event.click.subscribe((data) => {
      this.select(data);
      this.event.click.emit(data);
    });
    subscription.add(sub3);
    let sub4 = point.event.dblclick.subscribe((data) => {
      this.select(data);
      this.event.dblclick.emit(data);
    });
    subscription.add(sub4);
  }

  async load(datas: MobileEventRecord[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point = new SystemMainMapAMapAlarmMarkerController(
          data,
          this.timeout
        );
        this.regist(point, this.subscription);
        markers.push(point.marker);
        this.points.push(point);
      }
    }
    this.layer.add(markers);
    return markers;
  }

  clear() {
    this.layer.clear();
    this.info.remove();
    this.blur();
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
    this.info.add(info, undefined, [0, -50]);
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
}
