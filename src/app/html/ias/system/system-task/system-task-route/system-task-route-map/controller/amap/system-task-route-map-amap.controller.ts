import { formatDate } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';
import { FileGpsItem } from '../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ClassTool } from '../../../../../../../../common/tools/class-tool/class.tool';
import { Language } from '../../../../../../../../common/tools/language-tool/language';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { SystemTaskRouteMapAMapLabelController } from './label/system-task-route-map-amap-label.controller';
import { SystemTaskRouteMapAMapPathController } from './path/system-task-route-map-amap-path.controller';
import { SystemTaskRouteMapAMapRoadLabelController } from './road/system-task-route-map-amap-road-label.controller';
import { SystemTaskRouteMapAMapRoadPolylineController } from './road/system-task-route-map-amap-road-polyline.controller';

@Injectable()
export class SystemTaskRouteMapAMapController {
  event = {
    dblclick: new EventEmitter<FileGpsItem>(),
  };
  constructor() {
    MapHelper.amap
      .get('system-task-route-map-container', MapHelper.amap.plugins, true)
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);
        this.amap.set(x);
        let container = new Loca.Container({ map: x });
        this.loca.set(container);
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
  };

  private init = {
    map: (map: AMap.Map, container: Loca.Container) => {
      let center = map.getCenter();

      this.init.road.polyline(map);
      this.init.road.label(map);
      this.init.path(map);
      this.init.label(map);
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
      map.setFitView(undefined, false);
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
      controller.load(positions);
      let map = await this.amap.get();
      map.setFitView(undefined, false);
    },
  };

  private regist = {
    path: {
      mouse: {
        move: async (point: [number, number]) => {
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
          this.event.dblclick.emit(item);
        }
      },
    },
  };
}
