import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { IShop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { FileGpsItem } from '../../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { Road } from '../../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistrationTaskDetectedResult } from '../../../../../../../../../common/data-core/models/arm/geographic/shop-registration-task-detected-result.model';
import { ShopRegistration } from '../../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MapHelper } from '../../../../../../../../../common/helper/map/map.helper';
import { ClassTool } from '../../../../../../../../../common/tools/class-tool/class.tool';
import { Language } from '../../../../../../../../../common/tools/language-tool/language';
import { PromiseValue } from '../../../../../../../../../common/view-models/value.promise';
import { SystemAMapShopMarkerLayerController } from '../../../../../../system-map/component/controller/amap/marker/system-map-amap-shop-marker-layer.controller';
import { SystemTaskRouteMapAMapLabelController } from './label/system-task-route-map-amap-label.controller';
import { SystemTaskRouteMapAMapPathController } from './path/system-task-route-map-amap-path.controller';
import { SystemTaskRouteMapAMapPointController } from './point/system-task-route-map-amap-point.controller';
import { SystemTaskRouteMapAMapRoadLabelController } from './road/system-task-route-map-amap-road-label.controller';
import { SystemTaskRouteMapAMapRoadPolylineController } from './road/system-task-route-map-amap-road-polyline.controller';

@Injectable()
export class SystemTaskRouteMapAMapController {
  event = {
    path: {
      dblclick: new EventEmitter<FileGpsItem>(),
    },
    point: {
      mouseover: new EventEmitter<IShop>(),
      mouseout: new EventEmitter<IShop>(),
      click: new EventEmitter<IShop>(),
    },
  };
  constructor() {
    MapHelper.amap
      .get('system-task-route-map-container', MapHelper.amap.plugins, true)
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
        new PromiseValue<SystemTaskRouteMapAMapRoadPolylineController>(),
      label: new PromiseValue<SystemTaskRouteMapAMapRoadLabelController>(),
    },
    path: new PromiseValue<SystemTaskRouteMapAMapPathController>(),
    label: new PromiseValue<SystemTaskRouteMapAMapLabelController>(),
    point: new PromiseValue<SystemTaskRouteMapAMapPointController>(),
    marker: new PromiseValue<SystemAMapShopMarkerLayerController>(),
  };

  private init = {
    map: (map: AMap.Map, container?: Loca.Container) => {
      this.regist.map(map);
      let center = map.getCenter();
      this.init.road.polyline(map);
      this.init.road.label(map);
      this.init.path(map);
      this.init.label(map);
      if (container) {
        this.init.point(container);
      }
      this.init.marker(map);
    },
    marker: (map: AMap.Map) => {
      try {
        let controller = new SystemAMapShopMarkerLayerController(map);
        // controller.event.mouseover.subscribe((x) => {
        //   if (x.Location) {
        //     let position: [number, number] = [
        //       x.Location.GCJ02.Longitude,
        //       x.Location.GCJ02.Latitude,
        //     ];
        //     this.controller.label.get().then((label) => {
        //       if (x.Name) {
        //         label.show(position, x.Name);
        //       }
        //     });
        //   }
        // });
        // controller.event.mouseout.subscribe((x) => {
        //   this.controller.label.get().then((label) => {
        //     label.hide();
        //   });
        // });
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
        let controller = new SystemTaskRouteMapAMapPointController(loca);
        controller.event.move.subscribe((data) => {
          this.regist.point.over(data);
        });
        this.controller.point.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    path: (map: AMap.Map) => {
      try {
        let controller = new SystemTaskRouteMapAMapPathController(map);
        controller.mouseover.subscribe((x) => {
          this.regist.path.mouse.over(x);
        });
        controller.mouseout.subscribe(() => {
          this.regist.path.mouse.out();
        });
        controller.mousemove.subscribe((x) => {
          this.regist.path.mouse.move(x);
        });
        controller.dblclick.subscribe((x) => {
          this.regist.path.dblclick(x);
        });
        this.controller.path.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    label: (map: AMap.Map) => {
      try {
        let controller = new SystemTaskRouteMapAMapLabelController(map);
        this.controller.label.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    road: {
      polyline: (map: AMap.Map) => {
        try {
          let controller = new SystemTaskRouteMapAMapRoadPolylineController(
            map
          );
          this.controller.road.polyline.set(controller);
        } catch (error) {
          console.error(error);
        }
      },
      label: (map: AMap.Map) => {
        try {
          let controller = new SystemTaskRouteMapAMapRoadLabelController(map);
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
    path: {
      mouse: {
        move: async (point: [number, number]) => {
          this.regist.path.mouse.over(point);
        },
        over: async (point: [number, number]) => {
          let item = this.path.datas.find((x) => {
            return ClassTool.equals.array([x.Longitude, x.Latitude], point);
          });
          if (item) {
            let text = '';
            if (item.OSDTime) {
              text = formatDate(item.OSDTime, Language.yyyyMMddHHmmss, 'en');
            } else {
              text = item.OffsetTime.toString();
            }
            let _point: [number, number] = [item.Longitude, item.Latitude];
            let label = await this.controller.label.get();

            label.show(_point, text);
          }
        },
        out: async () => {
          let label = await this.controller.label.get();
          label.hide();
        },
      },
      dblclick: async (point: [number, number]) => {
        let item = this.path.datas.find((x) => {
          return ClassTool.equals.array([x.Longitude, x.Latitude], point);
        });
        if (item) {
          this.event.path.dblclick.emit(item);
        }
      },
    },
    point: {
      over: async (data: IShop) => {
        let label = await this.controller.label.get();
        if (data && data.Location) {
          let text = data.Name;

          let _point: [number, number] = [
            data.Location.GCJ02.Longitude,
            data.Location.GCJ02.Latitude,
          ];

          label.show(_point, text);
        } else {
          label.hide();
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
  path = {
    datas: [] as FileGpsItem[],
    load: async (datas: FileGpsItem[]) => {
      this.path.datas = datas;
      let controller = await this.controller.path.get();
      let positions = datas.map<[number, number]>((x) => [
        x.Longitude,
        x.Latitude,
      ]);
      controller.load(positions).then((x) => {
        this.amap.get().then((map) => {
          map.setFitView(x, false);
        });
      });
    },
    clear: async () => {
      let controller = await this.controller.path.get();
      controller.clear();
    },
  };
  point = {
    datas: {
      created: [] as IShop[],
      disappeared: [] as IShop[],
      existed: [] as IShop[],
    },
    load: (
      registrations: ShopRegistrationTaskDetectedResult[],
      analyses: Shop[]
    ) => {
      this.point.datas.created = analyses;
      this.point.datas.disappeared = [];
      this.point.datas.existed = [];
      registrations.forEach((x) => {
        if (x.Detected) {
          x.ObjectState = ShopObjectState.Existed;
          this.point.datas.existed.push(x);
        } else {
          x.ObjectState = ShopObjectState.Disappeared;
          this.point.datas.disappeared.push(x);
        }
      });
      this.controller.point.get().then((x) => {
        x.load(this.point.datas);
      });
      this.controller.marker.get().then((x) => {
        let datas = [
          this.point.datas.created,
          ...this.point.datas.existed,
          ...this.point.datas.disappeared,
        ].flat();
        x.load(datas);
      });
    },
    clear: async () => {
      this.point.datas.created = [];
      this.point.datas.disappeared = [];
      this.point.datas.existed = [];

      let point = await this.controller.point.get();
      point.clear();
      let marker = await this.controller.marker.get();
      marker.clear();
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
