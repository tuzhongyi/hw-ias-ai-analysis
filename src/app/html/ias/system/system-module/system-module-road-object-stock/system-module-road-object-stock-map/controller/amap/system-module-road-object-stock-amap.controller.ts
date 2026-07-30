import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObjectStock } from '../../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IASMapAMapRoadObjectMarkerLayerController } from '../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-marker-layer.controller';
import { IASMapAMapRoadObjectPolylineController } from '../../../../../../share/map/controller/amap/road-object/pollyline/ias-map-amap-road-object-polyline.controller';
import { IASMapAMapRoadController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road.controller';

export class SystemModuleRoadObjectStockAMapController {
  event = {
    road: {
      object: {
        click: new EventEmitter<RoadObjectStock>(),
        dblclick: new EventEmitter<RoadObjectStock>(),
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
      marker: this.controller.roadobject.marker.get(),
      polyline: this.controller.roadobject.polyline.get(),
    };
  }
  constructor(subscription: Subscription) {
    MapHelper.amap
      .get('system-module-road-object-stock-map', [], true, {
        showLabel: false,
        viewMode: '3D',
      })
      .then((map) => {
        map.setFeatures(['bg', 'road', 'building']);

        this.init.map(map);

        let container = this.init.container(map);

        this.init.road(map, container);

        let info = this.init.info(map);

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
        let ctr = new IASMapAMapRoadObjectPolylineController(map, container);
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

  private controller = {
    map: new PromiseValue<AMap.Map>(),
    container: new PromiseValue<Loca.Container>(),
    road: new PromiseValue<IASMapAMapRoadController>(),
    info: new PromiseValue<IASMapAMapInfoController>(),
    roadobject: {
      marker: new PromiseValue<IASMapAMapRoadObjectMarkerLayerController>(),
      polyline: new PromiseValue<IASMapAMapRoadObjectPolylineController>(),
    },
  };

  private regist = {
    map: (map: AMap.Map) => {
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
  };
}
