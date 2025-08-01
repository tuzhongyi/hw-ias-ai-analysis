import { EventEmitter, Injectable } from '@angular/core';
import { IShop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistration } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ObjectTool } from '../../../../../../../../common/tools/object-tool/object.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemAMapShopInfoController } from '../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-info.controller';
import { ISystemAMapShopMarkerInfo } from '../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-marker.model';
import { SystemModuleShopRegistrationMapAMapChangedLayerController } from './changed/system-module-shop-registration-map-amap-changed-layer.controller';
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
    point:
      new PromiseValue<SystemModuleShopRegistrationMapAMapPointController>(),
    marker:
      new PromiseValue<SystemModuleShopRegistrationMapAMapMarkerLayerController>(),
    changed:
      new PromiseValue<SystemModuleShopRegistrationMapAMapChangedLayerController>(),
    info: new PromiseValue<SystemAMapShopInfoController>(),
  };

  private init = {
    map: (map: AMap.Map, container?: Loca.Container) => {
      this.regist.map(map);
      let center = map.getCenter();
      this.init.road.polyline(map);
      this.init.road.label(map);
      if (container) {
        this.init.point(container);
      }
      let info = new SystemAMapShopInfoController(map);
      this.controller.info.set(info);
      this.init.marker(map, info);
      this.init.changed(map, info);
    },
    marker: (map: AMap.Map, info: SystemAMapShopInfoController) => {
      try {
        let controller =
          new SystemModuleShopRegistrationMapAMapMarkerLayerController(
            map,
            info
          );
        controller.event.dragend.subscribe((data) => {
          // this.point.reload(x);
          this.event.point.dragend.emit(data);
          this.controller.marker.get().then((x) => {
            x.remove(data);
          });
          this.controller.changed.get().then((x) => {
            x.add(data);
          });
        });

        controller.event.click.subscribe((x) => {
          this.event.point.click.emit(x);
        });
        this.controller.marker.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    changed: (map: AMap.Map, info: SystemAMapShopInfoController) => {
      try {
        let controller =
          new SystemModuleShopRegistrationMapAMapChangedLayerController(
            map,
            info
          );
        controller.event.dragend.subscribe((x) => {
          // this.point.reload(x);
          this.event.point.dragend.emit(x);
        });

        controller.event.click.subscribe((x) => {
          this.event.point.click.emit(x);
        });
        this.controller.changed.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    point: (loca: Loca.Container) => {
      try {
        let controller = new SystemModuleShopRegistrationMapAMapPointController(
          loca
        );
        controller.event.move.subscribe((data) => {
          this.regist.point.over(data as IShop);
        });
        this.controller.point.set(controller);
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
        let position: [number, number] = [e.pixel.x, e.pixel.y];
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
      over: async (data?: IShop) => {
        this.controller.info.get().then((ctr) => {
          if (data && data.Location) {
            let info: ISystemAMapShopMarkerInfo = {
              Name: data.Name,
            };
            if (data.Location) {
              info.Location = [
                data.Location.GCJ02.Longitude,
                data.Location.GCJ02.Latitude,
              ];
            }
            ctr.add(info);
          } else {
            ctr.remove();
          }
        });
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
    draggable: (enabled: boolean) => {
      this.controller.marker.get().then((x) => {
        x.set.draggable(enabled);
      });
    },
    load: (datas: ShopRegistration[]) => {
      this.point.datas = datas.map((x) => ObjectTool.copy(x, ShopRegistration));
      this.controller.point.get().then((x) => {
        x.load(this.point.datas);
      });
      this.controller.marker.get().then((x) => {
        x.load(this.point.datas);
      });
    },
    reload: async (changed: ShopRegistration) => {
      let datas = [...this.point.datas];
      let index = datas.findIndex((x) => x.Id === changed.Id);
      if (index >= 0) {
        datas[index] = changed;
      }
      let point = await this.controller.point.get();
      point.clear();
      point.load(datas);
    },
    // revoke: async (changed: ShopRegistration) => {
    //   this.point.reload(changed);
    //   let index = this.point.datas.findIndex((x) => x.Id === changed.Id);
    //   if (index >= 0) {
    //     let data = ObjectTool.copy(changed, ShopRegistration);
    //     this.point.datas[index] = data;
    //     let marker = await this.controller.marker.get();
    //     marker.set.position(data);
    //   }
    // },
    revoke: async (data: ShopRegistration) => {
      let index = this.point.datas.findIndex((x) => x.Id === data.Id);
      if (index >= 0) {
        let _data = ObjectTool.copy(data, ShopRegistration);
        this.point.datas[index] = _data;
        let changed = await this.controller.changed.get();
        changed.remove(_data);
        let marker = await this.controller.marker.get();
        marker.add(_data);
      }
    },
    clear: async () => {
      this.point.datas = [];
      let point = await this.controller.point.get();
      point.clear();
      let marker = await this.controller.marker.get();
      marker.clear();
      let changed = await this.controller.changed.get();
      changed.clear();
    },
    focus: async (data: ShopRegistration) => {
      if (data.Location) {
        let position: [number, number] = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
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
    location: (datas: ShopRegistration[]) => {
      this.controller.marker.get().then((marker) => {
        datas.forEach((x) => {
          marker.remove(x);
        });
      });
      this.controller.changed.get().then((x) => {
        x.set.location(datas);
      });
    },
  };

  map = {
    view: () => {
      this.amap.get().then((map) => {
        map.setFitView(undefined, true);
      });
    },
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
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
        this.amap.get().then((x) => {
          x.setCenter(position);
        });
      }
    },
  };
}
