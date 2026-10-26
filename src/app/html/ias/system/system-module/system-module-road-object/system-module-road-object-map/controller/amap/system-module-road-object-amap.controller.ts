import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Division } from '../../../../../../../../common/data-core/models/arm/division/division.model';
import { AMapCityLocator } from '../../../../../../../../common/helper/map/amap.helper';
import { IRoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.interface';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { GeoTool } from '../../../../../../../../common/tools/geo-tool/geo.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { LastResortTool } from '../../../../../../../../common/tools/last-resort-tool/last-resort.tool';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapRoadObjectMarkerLayerController } from '../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-layer.controller';
import { IASMapAMapRoadObjectPointLayerController } from '../../../../../../share/map/controller/amap/road-object/point/ias-map-amap-road-object-point-layer.controller';
import { IASMapAMapRoadObjectPolylineController } from '../../../../../../share/map/controller/amap/road-object/pollyline/ias-map-amap-road-object-polyline.controller';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';

export class SystemModuleRoadObjectAMapController<
  TRoadObject extends IRoadObject<any> = RoadObject,
> {
  event = {
    road: {
      object: {
        click: new EventEmitter<TRoadObject>(),
        dblclick: new EventEmitter<TRoadObject>(),
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
  constructor(container: HTMLDivElement, subscription: Subscription) {
    MapHelper.amap
      .get(container, [], true, {
        showLabel: false,
        viewMode: '3D',
      })
      .then((map) => {
        map.setFeatures(['bg', 'road', 'building']);
        map.setZoom(17);

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
        let ctr = new IASMapAMapRoadObjectPointLayerController<TRoadObject>(
          loca,
        );
        let sub = ctr.event.move.subscribe((data) => {
          this.regist.point.over(data);
        });
        subscription.add(sub);
        this.controller.roadobject.point.set(ctr);
      },
      marker: (
        map: AMap.Map,
        info: IASMapAMapInfoController,
        subscription: Subscription,
      ) => {
        let ctr = new IASMapAMapRoadObjectMarkerLayerController(
          map,
          subscription,
          info,
        );
        let sub1 = ctr.event.click.subscribe((x) => {
          this.event.road.object.click.emit(x as any);
        });
        subscription.add(sub1);
        let sub2 = ctr.event.dblclick.subscribe((x) => {
          this.event.road.object.dblclick.emit(x as any);
        });
        subscription.add(sub2);
        this.controller.roadobject.marker.set(ctr);
      },
      polyline: (
        map: AMap.Map,
        container: Loca.Container,
        subscription: Subscription,
      ) => {
        let ctr = new IASMapAMapRoadObjectPolylineController<TRoadObject>(
          map,
          container,
        );
        let sub_move = ctr.event.move.subscribe((data) => {
          this.regist.line.over(data);
        });
        subscription.add(sub_move);

        let sub_click = ctr.event.click.subscribe((x) => {
          this.event.road.object.click.emit(x as any);
        });
        subscription.add(sub_click);

        let sub_dblclick = ctr.event.dblclick.subscribe((x) => {
          this.event.road.object.dblclick.emit(x as any);
        });
        subscription.add(sub_dblclick);

        this.controller.roadobject.polyline.set(ctr);
      },
    },
  };

  private last = new LastResortTool();

  /**
   * 最后一次由数据接管视野的动作。城市兜底是异步落地的
   * （城市或区划边界要异步查回来再摆视野），可能晚于数据的 fitView，
   * 那时就把视野再摆回去。
   */
  private takeover?: () => void;

  /** 视野已被数据接管 → 取消城市兜底。传 restore 就顺手记住怎么把视野摆回来 */
  claim(restore?: () => void) {
    this.last.claim();
    if (restore) {
      this.takeover = restore;
    }
  }

  city(division: Division, locator?: AMapCityLocator) {
    this.last.fallback(() => {
      this.controller.map.get().then((x) => {
        // 等地图的这些时间里，可能已经有别的数据接管了视野
        if (this.last.claimed) return;
        MapHelper.amap.city(x, division, locator, () => {
          // 定位的回调同样可能落在数据的 fitView 之后 ——
          // 那就说明视野已经被数据接管了，把地图还给数据，别再往城市上摆
          if (this.last.claimed) {
            this.takeover?.();
            return;
          }
          x.setZoom(17);
        });
      });
    });
  }

  private controller = {
    map: new PromiseValue<AMap.Map>(),
    container: new PromiseValue<Loca.Container>(),
    road: new PromiseValue<IASMapAMapRoadController>(),
    info: new PromiseValue<IASMapAMapInfoController>(),
    roadobject: {
      point: new PromiseValue<
        IASMapAMapRoadObjectPointLayerController<TRoadObject>
      >(),
      marker: new PromiseValue<IASMapAMapRoadObjectMarkerLayerController>(),
      polyline: new PromiseValue<
        IASMapAMapRoadObjectPolylineController<TRoadObject>
      >(),
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
          x.move(position);
        });
      });
      map.on('click', (e: any) => {
        let position: [number, number] = [e.pixel.x, e.pixel.y];
        this.controller.roadobject.polyline.get().then((x) => {
          x.click(position);
        });
      });
      map.on('dblclick', (e: any) => {
        let position: [number, number] = [e.pixel.x, e.pixel.y];
        this.controller.roadobject.polyline.get().then((x) => {
          x.dblclick(position);
        });
      });
    },
    point: {
      over: async (data?: TRoadObject) => {
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
      over: async (data?: TRoadObject) => {
        let map = await this.map;
        this.controller.info.get().then((ctr) => {
          if (data && (data as any).GeoLine) {
            let line = ((data as any).GeoLine as any[]).map(
              (x: any): [number, number] => [x.Longitude, x.Latitude],
            );
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
