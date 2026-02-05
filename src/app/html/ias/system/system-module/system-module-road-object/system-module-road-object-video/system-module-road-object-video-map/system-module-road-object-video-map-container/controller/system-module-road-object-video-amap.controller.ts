import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { MapHelper } from '../../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapRoadObjectMarkerLayerController } from '../../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-layer.controller';
import { IASMapAMapRoadObjectPointLayerController } from '../../../../../../../share/map/controller/amap/road-object/point/ias-map-amap-road-object-point-layer.controller';
import { SystemModuleRoadObjectVideoAMapArrowController } from './path/system-module-road-object-video-amap-arrow.controller';
import { SystemModuleRoadObjectVideoAMapLabelController } from './path/system-module-road-object-video-amap-label.controller';
import { SystemModuleRoadObjectVideoAMapPathWayController } from './path/system-module-road-object-video-amap-path-way.controller';
import { SystemModuleRoadObjectVideoAMapPathController } from './path/system-module-road-object-video-amap-path.controller';
import { SystemTaskFileDetailsAMapPickupController } from './pickup/system-task-file-details-amap-pickup.controller';

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
  arrow = new PromiseValue<SystemModuleRoadObjectVideoAMapArrowController>();
  path = new PromiseValue<SystemModuleRoadObjectVideoAMapPathController>();
  way = new PromiseValue<SystemModuleRoadObjectVideoAMapPathWayController>();
  label = new PromiseValue<SystemModuleRoadObjectVideoAMapLabelController>();
  pickup = new PromiseValue<SystemTaskFileDetailsAMapPickupController>();
  roadobject = {
    point: new PromiseValue<IASMapAMapRoadObjectPointLayerController>(),
    marker: new PromiseValue<IASMapAMapRoadObjectMarkerLayerController>(),
  };
  private info = new PromiseValue<IASMapAMapInfoController>();

  constructor(private subscription: Subscription) {
    MapHelper.amap
      .get('system-task-file-details-map-container', undefined, true)
      .then((x) => {
        let container = this.init.map(x);
        let info = this.init.info(x);
        this.init.path(x);
        this.init.pickup(x);

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
      this.arrow.set(new SystemModuleRoadObjectVideoAMapArrowController(map));
      this.path.set(new SystemModuleRoadObjectVideoAMapPathController(map));
      this.way.set(new SystemModuleRoadObjectVideoAMapPathWayController(map));
      this.label.set(new SystemModuleRoadObjectVideoAMapLabelController(map));
    },
    pickup: (map: AMap.Map) => {
      let point = new SystemTaskFileDetailsAMapPickupController(map);
      this.pickup.set(point);
      this.regist.point(point);
    },
    roadobject: {
      point: (loca: Loca.Container) => {
        let ctr = new IASMapAMapRoadObjectPointLayerController(loca);
        let sub = ctr.event.move.subscribe((data) => {
          this.regist.roadobject.point.over(data);
        });
        this.subscription.add(sub);
        this.roadobject.point.set(ctr);
      },
      marker: (map: AMap.Map, info: IASMapAMapInfoController) => {
        let ctr = new IASMapAMapRoadObjectMarkerLayerController(
          map,
          info,
          this.subscription
        );
        let sub1 = ctr.event.click.subscribe((x) => {
          this.event.road.object.click.emit(x);
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
      controller.event.dragend.subscribe((x) => {
        this.event.point.emit(x);
      });
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
}
