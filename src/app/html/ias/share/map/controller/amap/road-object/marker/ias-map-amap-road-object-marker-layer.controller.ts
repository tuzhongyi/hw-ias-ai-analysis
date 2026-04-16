import { Subscription } from 'rxjs';
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
  TIcon extends IASMapAMapRoadObjectIconController = IASMapAMapRoadObjectIconController,
  TMarker extends IASMapAMapRoadObjectMarkerLabelController<TIcon> = IASMapAMapRoadObjectMarkerLabelController<TIcon>
> {
  event = new IASMapAMapMarkerEvent<RoadObject>();

  constructor(
    private map: AMap.Map,
    private subscription: Subscription,
    private info?: IIASMapAMapInfoController
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

  protected create(data: RoadObject) {
    return new IASMapAMapRoadObjectMarkerLabelController(data);
  }

  private regist(point: TMarker, subscription: Subscription) {
    let sub1 = point.event.mouseover.subscribe((data) => {
      this.event.mouseover.emit(data);

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
      this.event.mouseout.emit(data);
      if (this.info) {
        this.info.remove();
      }
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

  async load(datas: RoadObject[]) {
    let markers = [];
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      if (data.Location) {
        let point = this.create(data) as TMarker;
        this.regist(point, this.subscription);
        let marker = await point.marker;
        markers.push(marker);
        this.points.push(point);
      }
    }
    this.layer.add(markers);

    // let circles = datas.map((x) => {
    //   return new AMap.Circle({
    //     center: [x.Location.GCJ02.Longitude, x.Location.GCJ02.Latitude],
    //     radius: 2,
    //     strokeColor: '#FF33FF',
    //     strokeOpacity: 1,
    //     strokeWeight: 2,
    //     fillColor: '#FF33FF',
    //     fillOpacity: 0.5,
    //   });
    // });
    // this.map.add(circles);

    return markers;
  }

  clear() {
    this.layer.clear();
    this.points = [];
  }

  mouseover(data: RoadObject) {
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
  mouseout(data: RoadObject) {
    if (this.info) {
      this.info.remove();
    }

    let point = this.points.find((x) => x.data.Id === data.Id);
    if (point) {
      point.out();
    }
  }

  select(data: RoadObject) {
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
