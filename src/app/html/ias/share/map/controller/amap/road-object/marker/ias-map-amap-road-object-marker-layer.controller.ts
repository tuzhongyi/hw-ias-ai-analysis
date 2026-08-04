import { Subscription } from 'rxjs';
import { IRoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.interface';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { IASMapAMapConfig } from '../../ias-map-amap.config';
import {
  IIASMapAMapInfo,
  IIASMapAMapInfoController,
} from '../../info/ias-map-amap-info.model';
import { IASMapAMapMarkerEvent } from '../../marker/ias-map-amap-marker.model';
import { IASMapAMapRoadObjectIconController } from './ias-map-amap-road-object-icon.controller';
import { IASMapAMapRoadObjectMarkerLabelController } from './ias-map-amap-road-object-marker-label.controller';

export class IASMapAMapRoadObjectMarkerLayerController<
  TIcon extends IASMapAMapRoadObjectIconController =
    IASMapAMapRoadObjectIconController,
  TMarker extends IASMapAMapRoadObjectMarkerLabelController<TIcon> =
    IASMapAMapRoadObjectMarkerLabelController<TIcon>,
  TRoadObject extends IRoadObject = RoadObject,
> {
  event = new IASMapAMapMarkerEvent<TRoadObject>();

  constructor(
    private map: AMap.Map,
    private subscription: Subscription,
    private info?: IIASMapAMapInfoController,
  ) {
    this.layer = this.init(map);
  }

  private layer: AMap.LabelsLayer;
  private points: TMarker[] = [];

  private init(map: AMap.Map) {
    let layer = new AMap.LabelsLayer({
      collision: false,
      allowCollision: false,
      zooms: IASMapAMapConfig.icon.zooms,
    });
    map.add(layer);
    return layer;
  }

  protected create(data: TRoadObject) {
    return new IASMapAMapRoadObjectMarkerLabelController(data);
  }

  private regist(point: TMarker, subscription: Subscription) {
    let sub1 = point.event.mouseover.subscribe((data) => {
      this.event.mouseover.emit(data as unknown as TRoadObject);

      if (this.info) {
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
      }
    });
    subscription.add(sub1);
    let sub2 = point.event.mouseout.subscribe((data) => {
      this.event.mouseout.emit(data as unknown as TRoadObject);
      if (this.info) {
        this.info.remove();
      }
    });
    subscription.add(sub2);
    let sub3 = point.event.click.subscribe((data) => {
      this.select(data as unknown as TRoadObject);
      this.event.click.emit(data as unknown as TRoadObject);
    });
    subscription.add(sub3);
    let sub4 = point.event.dblclick.subscribe((data) => {
      this.select(data as unknown as TRoadObject);
      this.event.dblclick.emit(data as unknown as TRoadObject);
    });
    subscription.add(sub4);
  }

  async load(datas: TRoadObject[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point = this.create(data) as unknown as TMarker;
        this.regist(point, this.subscription);
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

  mouseover(data: TRoadObject) {
    let info: IIASMapAMapInfo = {
      Name: data.Name,
    };
    if (data.Location) {
      info.Location = [
        data.Location.GCJ02.Longitude,
        data.Location.GCJ02.Latitude,
      ];
    }
    if (this.info) {
      this.info.add(info, undefined, [0, -SizeTool.map.shop.height]);
    }
    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.hover();
    }
  }
  mouseout(data: TRoadObject) {
    if (this.info) {
      this.info.remove();
    }

    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.out();
    }
  }

  select(data: TRoadObject) {
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
