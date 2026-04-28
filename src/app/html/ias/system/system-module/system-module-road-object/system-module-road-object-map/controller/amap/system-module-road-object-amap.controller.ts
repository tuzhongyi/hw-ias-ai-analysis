import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapRoadObjectMarkerLayerController } from '../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-layer.controller';
import { IASMapAMapRoadObjectPointLayerController } from '../../../../../../share/map/controller/amap/road-object/point/ias-map-amap-road-object-point-layer.controller';
import { IASMapAMapRoadObjectPolylineController } from '../../../../../../share/map/controller/amap/road-object/pollyline/ias-map-amap-road-object-polyline.controller';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';

export class SystemModuleRoadObjectAMapController {
  event = {
    road: {
      object: {
        click: new EventEmitter<RoadObject>(),
        dblclick: new EventEmitter<RoadObject>(),
      },
    },
  };
  get road() {
    return this.controller.road.get();
  }

  get map() {
    return this.controller.map.get();
  }
  get roadobject() {
    return {
      point: this.controller.roadobject.point.get(),
      marker: this.controller.roadobject.marker.get(),
      polyline: this.controller.roadobject.polyline.get(),
    };
  }
  constructor(subscription: Subscription) {
    MapHelper.amap
      .get('system-module-road-object-map', [], true, {
        showLabel: false,
        viewMode: '3D',
      })
      .then((map) => {
        map.setFeatures(['bg', 'road', 'building']);

        this.init.map(map);

        let container = this.init.container(map);

        this.init.road(map, container);

        let info = this.init.info(map);

        this.init.roadobject.point(container, subscription);
        this.init.roadobject.marker(map, info, subscription);
        this.init.roadobject.polyline(map, container, subscription);
      });
  }

  private init = {
    map: (map: AMap.Map) => {
      this.regist.map(map);
      this.controller.map.set(map);
    },
    container: (map: AMap.Map) => {
      let container = new Loca.Container({ map: map });
      this.controller.container.set(container);
      return container;
    },
    road: (map: AMap.Map, loca: Loca.Container) => {
      let ctr = new IASMapAMapRoadController(map, loca);
      this.controller.road.set(ctr);
    },
    info: (map: AMap.Map) => {
      let ctr = new IASMapAMapInfoController(map);
      this.controller.info.set(ctr);
      return ctr;
    },
    roadobject: {
      point: (loca: Loca.Container, subscription: Subscription) => {
        let ctr = new IASMapAMapRoadObjectPointLayerController(loca);
        let sub = ctr.event.move.subscribe((data) => {
          this.regist.point.over(data);
        });
        subscription.add(sub);
        this.controller.roadobject.point.set(ctr);
      },
      marker: (
        map: AMap.Map,
        info: IASMapAMapInfoController,
        subscription: Subscription
      ) => {
        let ctr = new IASMapAMapRoadObjectMarkerLayerController(
          map,
          subscription,
          info
        );
        let sub1 = ctr.event.click.subscribe((x) => {
          this.event.road.object.click.emit(x);
        });
        subscription.add(sub1);
        let sub2 = ctr.event.dblclick.subscribe((x) => {
          this.event.road.object.dblclick.emit(x);
        });
        subscription.add(sub2);
        this.controller.roadobject.marker.set(ctr);
      },
      polyline: (
        map: AMap.Map,
        container: Loca.Container,
        subscription: Subscription
      ) => {
        let ctr = new IASMapAMapRoadObjectPolylineController(map, container);
        let sub = ctr.event.move.subscribe((data) => {
          this.regist.line.over(data);
        });
        subscription.add(sub);
        this.controller.roadobject.polyline.set(ctr);
      },
    },
  };

  private controller = {
    map: new PromiseValue<AMap.Map>(),
    container: new PromiseValue<Loca.Container>(),
    road: new PromiseValue<IASMapAMapRoadController>(),
    info: new PromiseValue<IASMapAMapInfoController>(),
    roadobject: {
      point: new PromiseValue<IASMapAMapRoadObjectPointLayerController>(),
      marker: new PromiseValue<IASMapAMapRoadObjectMarkerLayerController>(),
      polyline: new PromiseValue<IASMapAMapRoadObjectPolylineController>(),
    },
  };

  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e: any) => {
        let position: [number, number] = [e.pixel.x, e.pixel.y];
        this.controller.roadobject.point.get().then((x) => {
          x.moving(position);
        });
        this.controller.roadobject.polyline.get().then((x) => {
          x.moving(position);
        });
      });
    },
    point: {
      over: async (data?: RoadObject) => {
        this.controller.info.get().then((ctr) => {
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
    line: {
      over: async (data?: RoadObject) => {
        let map = await this.map;
        this.controller.info.get().then((ctr) => {
          if (data && data.GeoLine) {
            let line = data.GeoLine.map<[number, number]>((x) => [
              x.Longitude,
              x.Latitude,
            ]);
            let center = GeoTool.polyline.center(line);
            let info: IIASMapAMapInfo = {
              Name: data.Name,
            };
            if (data.Location) {
              info.Location = center;
            }
            ctr.add(info, undefined, [0, -15]);
          } else {
            ctr.remove();
          }
        });
      },
    },
  };
}
