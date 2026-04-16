import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { MapHelper } from '../../../../../../../../../common/helper/map/map.helper';
import {
  GeoLine,
  GeoPoint,
} from '../../../../../../../../../common/tools/geo-tool/geo.model';
import { GeoTool } from '../../../../../../../../../common/tools/geo-tool/geo.tool';
import { ObjectTool } from '../../../../../../../../../common/tools/object-tool/object.tool';
import { PromiseValue } from '../../../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapPathArrowController } from '../../../../../../../share/map/controller/amap/path/ias-map-amap-path-arrow.controller';
import { IASMapAMapPathLabelController } from '../../../../../../../share/map/controller/amap/path/ias-map-amap-path-label.controller';
import { IASMapAMapPathWayController } from '../../../../../../../share/map/controller/amap/path/ias-map-amap-path-way.controller';
import { IASMapAMapPathController } from '../../../../../../../share/map/controller/amap/path/ias-map-amap-path.controller';
import { SystemTaskFileDetailsAMapPickupController } from './pickup/system-task-file-details-amap-pickup.controller';
import { SystemMainMapAMapRoadObjectMarkerLayerController } from './road-object/marker/system-main-map-amap-road-object-marker-layer.controller';
import { SystemMainMapAMapRoadObjectPointLayerController } from './road-object/point/system-main-map-amap-road-object-point-layer.controller';

export class SystemModuleRoadObjectVideoAMapController {
  event = {
    point: new EventEmitter<[number, number]>(),
    road: {
      object: {
        click: new EventEmitter<RoadObject>(),
        dblclick: new EventEmitter<RoadObject>(),
      },
    },
  };
  pickupable = false;
  map = new PromiseValue<AMap.Map>();
  arrow = new PromiseValue<IASMapAMapPathArrowController>();
  way = new PromiseValue<IASMapAMapPathWayController>();
  label = new PromiseValue<IASMapAMapPathLabelController>();
  pickup = new PromiseValue<SystemTaskFileDetailsAMapPickupController>();
  roadobject = {
    point: new PromiseValue<SystemMainMapAMapRoadObjectPointLayerController>(),
    marker:
      new PromiseValue<SystemMainMapAMapRoadObjectMarkerLayerController>(),
  };
  private info = new PromiseValue<IASMapAMapInfoController>();

  constructor(private subscription: Subscription) {
    MapHelper.amap
      .get('system-task-file-details-map-container', undefined, true)
      .then((x) => {
        let container = this.init.map(x);
        let info = this.init.info(x);
        this.init.path(x);
        this.init.pickup(x, subscription);

        this.init.roadobject.point(container);
        this.init.roadobject.marker(x, info);
      });
  }

  private loca = new PromiseValue<Loca.Container>();

  private init = {
    map: (map: AMap.Map) => {
      this.map.set(map);

      let loca = new Loca.Container({ map: map });
      this.loca.set(loca);

      this.regist.map(map);
      return loca;
    },
    info: (map: AMap.Map) => {
      let ctr = new IASMapAMapInfoController(map);
      this.info.set(ctr);
      return ctr;
    },
    path: (map: AMap.Map) => {
      this.arrow.set(new IASMapAMapPathArrowController(map));
      this.way.set(new IASMapAMapPathWayController(map));
      this.label.set(new IASMapAMapPathLabelController(map));
    },
    pickup: (map: AMap.Map, subscription: Subscription) => {
      let point = new SystemTaskFileDetailsAMapPickupController(
        map,
        subscription
      );
      this.pickup.set(point);
      this.regist.point(point);
    },
    roadobject: {
      point: (loca: Loca.Container) => {
        let ctr = new SystemMainMapAMapRoadObjectPointLayerController(loca);
        let sub = ctr.event.move.subscribe((data) => {
          this.regist.roadobject.point.over(data);
        });
        this.subscription.add(sub);
        this.roadobject.point.set(ctr);
      },
      marker: (map: AMap.Map, info: IASMapAMapInfoController) => {
        let ctr = new SystemMainMapAMapRoadObjectMarkerLayerController(
          map,
          info,
          this.subscription
        );
        let sub1 = ctr.event.click.subscribe((x) => {
          this.event.road.object.click.emit(x);

          let gcj02 = x.Location.GCJ02;
          let point: GeoPoint = [gcj02.Longitude, gcj02.Latitude];
          let closests = this._path.map((x) => {
            return GeoTool.polyline.closest.get(x.points, point);
          });
          closests = closests.sort((a, b) => {
            let _a = a?.distance ?? 0;
            let _b = b?.distance ?? 0;
            return _a - _b;
          });
          let closest = closests[0];
          if (closest) {
            this.path.click.emit({
              line: closest.line,
              point: closest.foot,
              percent: closest.percent.segment,
            });
          }
        });
        this.subscription.add(sub1);
        let sub2 = ctr.event.dblclick.subscribe((x) => {
          this.event.road.object.dblclick.emit(x);
        });
        this.subscription.add(sub2);
        this.roadobject.marker.set(ctr);
      },
    },
  };

  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e: any) => {
        let position: [number, number] = [e.pixel.x, e.pixel.y];

        this.roadobject.point.get().then((x) => {
          x.moving(position);
        });
      });
      map.on('click', (x) => {
        this.pickup.get().then((point) => {
          let position: [number, number] = [x.lnglat.lng, x.lnglat.lat];
          point.remove().then((x) => {
            if (this.pickupable) {
              point.create(position);
              this.event.point.emit(position);
            }
          });
        });
      });
    },
    point: (controller: SystemTaskFileDetailsAMapPickupController) => {
      let sub = controller.event.dragend.subscribe((x) => {
        this.event.point.emit(x);
      });
      this.subscription.add(sub);
    },

    roadobject: {
      point: {
        over: async (data?: RoadObject) => {
          this.info.get().then((ctr) => {
            if (data && data.Location) {
              let info: IIASMapAMapInfo = {
                Name: data.Name,
              };
              if (data.Location) {
                info.Location = [
                  data.Location.GCJ02.Longitude,
                  data.Location.GCJ02.Latitude,
                ];
              }
              ctr.add(info, undefined, [0, -15]);
            } else {
              ctr.remove();
            }
          });
        },
      },
    },
  };

  center(position: [number, number]) {
    this.map.get().then((x) => {
      x.setCenter(position);
    });
  }

  destroy() {
    this.map.get().then((x) => {
      x.destroy();
      this.map.clear();
    });
  }

  private _path: IASMapAMapPathController[] = [];
  path = {
    mouseover: new EventEmitter<{
      line: GeoLine;
      point: GeoPoint;
      percent: number;
    }>(),
    mouseout: new EventEmitter<void>(),
    click: new EventEmitter<{
      line: GeoLine;
      point: GeoPoint;
      percent: number;
    }>(),
    load: async (datas: FileGpsItem[], focus: boolean) => {
      let map = await this.map.get();
      let splited = ObjectTool.model.FileGpsItem.split(datas);
      let polylines = splited
        .map((items, i) => {
          let positions = items.map(
            (x) => [x.Longitude, x.Latitude] as [number, number]
          );
          let type = items.every((x) => !!x.HighPrecision) ? 1 : 0;
          let path = new IASMapAMapPathController(map, type);
          let sub1 = path.mouseover.subscribe((x) => {
            this.path.mouseover.emit(x);
          });
          this.subscription.add(sub1);
          let sub2 = path.mouseout.subscribe((x) => {
            this.path.mouseout.emit(x);
          });
          this.subscription.add(sub2);
          let sub3 = path.click.subscribe((x) => {
            this.path.click.emit(x);
          });
          this.subscription.add(sub3);

          this._path.push(path);
          return path.load(positions, false)!;
        })
        .filter((x) => !!x);

      if (focus) {
        map.setFitView(polylines, true);
        setTimeout(() => {
          map.setFitView(polylines, true);
        }, 2 * 1000);
      }
    },
    clear: () => {
      this._path.forEach((x) => {
        x.clear();
      });
      this._path = [];
    },
  };
}
