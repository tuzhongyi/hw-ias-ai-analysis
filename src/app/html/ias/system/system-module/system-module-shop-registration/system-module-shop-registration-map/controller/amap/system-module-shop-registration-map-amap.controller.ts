import { EventEmitter, Injectable } from '@angular/core';
import { IShop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistration } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ClassTool } from '../../../../../../../../common/tools/class-tool/class.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemModuleShopRegistrationMapAMapLabelController } from './label/system-module-shop-registration-map-amap-label.controller';
import { SystemModuleShopRegistrationMapAMapMarkerLayerController } from './marker/system-module-shop-registration-map-amap-marker-layer.controller';
import { SystemModuleShopRegistrationMapAMapPointController } from './point/system-module-shop-registration-map-amap-point.controller';
import { SystemModuleShopRegistrationMapAMapRoadLabelController } from './road/system-module-shop-registration-map-amap-road-label.controller';
import { SystemModuleShopRegistrationMapAMapRoadPolylineController } from './road/system-module-shop-registration-map-amap-road-polyline.controller';

@Injectable()
export class SystemModuleShopRegistrationMapAMapController {
  event = {
    point: {
      mouseover: new EventEmitter<IShop>(),
      mouseout: new EventEmitter<IShop>(),
      click: new EventEmitter<IShop>(),
      dragend: new EventEmitter<IShop>(),
    },
  };
  constructor() {
    MapHelper.amap
      .get(
        'system-module-shop-registration-map-container',
        MapHelper.amap.plugins,
        true
      )
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);
        this.amap.set(x);
        let container: Loca.Container | undefined = undefined;
        try {
          container = new Loca.Container({ map: x });
          this.loca.set(container);
        } catch (error) {
          console.error(error);
        }
        this.init.map(x, container);
      });
  }

  private amap = new PromiseValue<AMap.Map>();
  private loca = new PromiseValue<Loca.Container>();
  private controller = {
    road: {
      polyline:
        new PromiseValue<SystemModuleShopRegistrationMapAMapRoadPolylineController>(),
      label:
        new PromiseValue<SystemModuleShopRegistrationMapAMapRoadLabelController>(),
    },
    label:
      new PromiseValue<SystemModuleShopRegistrationMapAMapLabelController>(),
    point:
      new PromiseValue<SystemModuleShopRegistrationMapAMapPointController>(),
    marker:
      new PromiseValue<SystemModuleShopRegistrationMapAMapMarkerLayerController>(),
  };

  private init = {
    map: (map: AMap.Map, container?: Loca.Container) => {
      this.regist.map(map);
      let center = map.getCenter();
      this.init.road.polyline(map);
      this.init.road.label(map);
      this.init.label(map);
      if (container) {
        this.init.point(container);
      }
      this.init.marker(map);
    },
    marker: (map: AMap.Map) => {
      try {
        let controller =
          new SystemModuleShopRegistrationMapAMapMarkerLayerController(map);
        controller.event.dragend.subscribe((x) => {
          this.point.reload(x);
          this.event.point.dragend.emit(x);
        });

        controller.event.click.subscribe((x) => {
          this.event.point.click.emit(x);
        });
        this.controller.marker.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    point: (loca: Loca.Container) => {
      try {
        let controller = new SystemModuleShopRegistrationMapAMapPointController(
          loca
        );
        controller.event.move.subscribe((position) => {
          this.regist.point.over(position);
        });
        this.controller.point.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    label: (map: AMap.Map) => {
      try {
        let controller = new SystemModuleShopRegistrationMapAMapLabelController(
          map
        );
        this.controller.label.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    road: {
      polyline: (map: AMap.Map) => {
        try {
          let controller =
            new SystemModuleShopRegistrationMapAMapRoadPolylineController(map);
          this.controller.road.polyline.set(controller);
        } catch (error) {
          console.error(error);
        }
      },
      label: (map: AMap.Map) => {
        try {
          let controller =
            new SystemModuleShopRegistrationMapAMapRoadLabelController(map);
          this.controller.road.label.set(controller);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  private regist = {
    map: (map: AMap.Map) => {
      map.on('mousemove', (e: any) => {
        let position: [number, number] = [e.lnglat.lng, e.lnglat.lat];
        this.controller.point.get().then((x) => {
          x.moving(position);
        });
      });
      map.on('zoomchange', (e: any) => {
        let map = e.target as AMap.Map;
        let zoom = map.getZoom();
        this.controller.marker.get().then((x) => {
          x.set.zoom(zoom);
        });
      });
    },
    point: {
      over: async (position: [number, number]) => {
        let item = this.point.datas.find((x) => {
          if (x.Location) {
            return ClassTool.equals.array(
              [x.Location.Longitude, x.Location.Latitude],
              position
            );
          }
          return false;
        });
        if (item && item.Location) {
          let text = item.Name;

          let _point: [number, number] = [
            item.Location.Longitude,
            item.Location.Latitude,
          ];
          let label = await this.controller.label.get();

          label.show(_point, text);
        }
      },
    },
  };

  road = {
    load: async (datas: Road[]) => {
      let polyline = await this.controller.road.polyline.get();
      let label = await this.controller.road.label.get();
      let map = await this.amap.get();

      datas.forEach((data) => {
        if (data.GeoLine) {
          let points = data.GeoLine.map<[number, number]>((x) => [
            x.Longitude,
            x.Latitude,
          ]);
          polyline.add(data.Id, points);
          label.add(data);
        }
      });
    },
  };
  point = {
    datas: [] as IShop[],
    load: (datas: ShopRegistration[]) => {
      this.point.datas = [...datas];
      this.controller.point.get().then((x) => {
        x.load(this.point.datas);
      });
      this.controller.marker.get().then((x) => {
        x.load(datas).then((markers) => {
          this.amap.get().then((map) => {
            map.setFitView(markers, true);
          });
        });
      });
    },
    reload: async (changed: ShopRegistration) => {
      let datas = [...this.point.datas];
      let index = datas.findIndex((x) => x.Id === changed.Id);
      if (index >= 0) {
        datas[index] = changed;
      }
      let controller = await this.controller.point.get();
      controller.clear();
      controller.load(datas);
    },
    clear: async () => {
      this.point.datas = [];
      let point = await this.controller.point.get();
      point.clear();
      let marker = await this.controller.marker.get();
      marker.clear();
    },
    focus: async (data: ShopRegistration) => {
      if (data.Location) {
        let position: [number, number] = [
          data.Location.Longitude,
          data.Location.Latitude,
        ];
        this.amap.get().then((x) => {
          x.setCenter(position);
          x.setZoom(19.5);
        });
        let marker = await this.controller.marker.get();
        marker.select(data);
      }
    },
    over: async (data: ShopRegistration) => {
      let marker = await this.controller.marker.get();
      marker.mouseover(data);
    },
    out: async (data: ShopRegistration) => {
      let marker = await this.controller.marker.get();
      marker.mouseout(data);
    },
  };

  map = {
    destory: () => {
      this.loca.get().then((loca) => {
        loca.destroy();
        this.loca.clear();
        this.amap.get().then((map) => {
          map.destroy();
          this.amap.clear();
        });
      });
    },
    move: (data: ShopRegistration) => {
      if (data.Location) {
        let position: [number, number] = [
          data.Location.Longitude,
          data.Location.Latitude,
        ];
        this.amap.get().then((x) => {
          x.setCenter(position);
        });
      }
    },
  };
}
