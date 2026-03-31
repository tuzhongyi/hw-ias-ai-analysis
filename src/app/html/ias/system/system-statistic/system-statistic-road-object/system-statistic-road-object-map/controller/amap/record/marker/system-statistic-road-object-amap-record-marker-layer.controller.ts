import { Subscription } from 'rxjs';
import { RoadObjectEventRecord } from '../../../../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { IIASMapAMapInfo } from '../../../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapMarkerEvent } from '../../../../../../../../share/map/controller/amap/marker/ias-map-amap-marker.model';
import { SystemStatisticRoadObjectAMapRecordMarkerLabelController } from './system-statistic-road-object-amap-record-marker-label.controller';

export class SystemStatisticRoadObjectAMapRecordMarkerLayerController {
  event = new IASMapAMapMarkerEvent<RoadObjectEventRecord>();

  constructor(map: AMap.Map, private subscription: Subscription) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private points: SystemStatisticRoadObjectAMapRecordMarkerLabelController[] =
    [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: [0, 50],
    });
    map.add(layer);
    return layer;
  }

  private regist(
    point: SystemStatisticRoadObjectAMapRecordMarkerLabelController
  ) {
    let sub1 = point.event.mouseover.subscribe((data) => {
      this.event.mouseover.emit(data);
    });
    this.subscription.add(sub1);
    let sub2 = point.event.mouseout.subscribe((data) => {
      this.event.mouseout.emit(data);
    });
    this.subscription.add(sub2);
    let sub3 = point.event.click.subscribe((data) => {
      this.select(data);
      this.event.click.emit(data);
    });
    this.subscription.add(sub3);
    let sub4 = point.event.dblclick.subscribe((data) => {
      this.select(data);
      this.event.dblclick.emit(data);
    });
    this.subscription.add(sub4);
  }

  async load(datas: RoadObjectEventRecord[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point =
          new SystemStatisticRoadObjectAMapRecordMarkerLabelController(
            data as any
          );
        this.regist(point);
        let marker = await point.marker;
        markers.push(marker);
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

  mouseover(data: RoadObjectEventRecord) {
    let info: IIASMapAMapInfo = {
      Name: data.RoadObjectName,
    };
    if (data.Location) {
      info.Location = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
    }

    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.hover();
    }
  }
  mouseout(data: RoadObjectEventRecord) {
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.out();
    }
  }

  select(data: RoadObjectEventRecord) {
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
