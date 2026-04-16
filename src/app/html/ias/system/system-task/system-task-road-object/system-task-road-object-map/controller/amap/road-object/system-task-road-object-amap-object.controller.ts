import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';
import { IASMapAMapRoadObjectMarkerLayerController } from '../../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-layer.controller';
import { IASMapAMapRoadObjectPointLayerController } from '../../../../../../../share/map/controller/amap/road-object/point/ias-map-amap-road-object-point-layer.controller';
import { SystemTaskRoadObjectAMapInfoController } from '../info/system-task-road-object-amap-info.controller';

export class SystemTaskRoadObjectAMapObjectController {
  event = {
    click: new EventEmitter<RoadObject>(),
    dblclick: new EventEmitter<RoadObject>(),
  };

  constructor(
    private map: AMap.Map,
    container: Loca.Container,
    private info: SystemTaskRoadObjectAMapInfoController,
    subscription: Subscription
  ) {
    this.point = new IASMapAMapRoadObjectPointLayerController(container);
    this.marker = new IASMapAMapRoadObjectMarkerLayerController(
      map,
      subscription
    );
    this.regist.subscribe(subscription);
  }

  private point: IASMapAMapRoadObjectPointLayerController;
  private marker: IASMapAMapRoadObjectMarkerLayerController;
  private selected?: RoadObject;

  private regist = {
    subscribe: (subscription: Subscription) => {
      this.regist.map();
      this.regist.point(subscription);
      this.regist.marker(subscription);
    },
    map: () => {
      this.map.on('mousemove', (e) => {
        let pixel: [number, number] = [e.pixel.x, e.pixel.y];
        this.point.moving(pixel);
      });
    },
    point: (subscription: Subscription) => {
      let sub_point_move = this.point.event.move.subscribe((data) => {
        if (data) {
          this.info.add(data);
        } else {
          this.info.remove();
        }
      });
      subscription.add(sub_point_move);
    },
    marker: (subscription: Subscription) => {
      let sub_click = this.marker.event.click.subscribe((data) => {
        this.event.click.emit(data);
      });
      subscription.add(sub_click);

      let sub_dblclick = this.marker.event.dblclick.subscribe((data) => {
        this.event.dblclick.emit(data);
      });
      subscription.add(sub_dblclick);
      let sub_marker_mouseover = this.marker.event.mouseover.subscribe(
        (data) => {
          if (data) {
            this.info.add(data);
          }
        }
      );
      subscription.add(sub_marker_mouseover);
      let sub_marker_mouseout = this.marker.event.mouseout.subscribe((data) => {
        this.info.remove();
        if (this.selected) {
          this.info.add(this.selected);
        }
      });
      subscription.add(sub_marker_mouseout);
    },
  };

  load(datas: RoadObject[]) {
    this.point.load(datas);
    return this.marker.load(datas);
  }
  clear() {
    this.point.clear();
    this.marker.clear();
  }
  select(data: RoadObject) {
    if (this.selected && this.selected.Id === data.Id) {
      return false;
    }
    this.selected = data;
    this.marker.mouseover(data);
    this.marker.select(data);
    return true;
  }

  hover(data: RoadObject) {
    let zoom = this.map.getZoom();
    if (zoom >= IASMapAMapConfig.icon.zooms[0]) {
      this.marker.mouseover(data);
    } else {
      let gcj02 = data.Location.GCJ02;
      let position = [gcj02.Longitude, gcj02.Latitude] as [number, number];
      this.point.moving(position, false);
    }
  }
  leave(data: RoadObject) {
    this.marker.blur();
    if (this.selected) {
      this.info.add(this.selected);
    }
  }
}
