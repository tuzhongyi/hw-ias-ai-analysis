import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { Road } from '../../../../../../../../common/data-core/models/arm/geographic/road.model';
import { MapHelper } from '../../../../../../../../common/helper/map/map.helper';
import { ObjectTool } from '../../../../../../../../common/tools/object-tool/object.tool';
import { PromiseValue } from '../../../../../../../../common/view-models/value.promise';
import { IASMapAMapInfoController } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.controller';
import { IIASMapAMapInfo } from '../../../../../../share/map/controller/amap/info/ias-map-amap-info.model';
import { IASMapAMapRoadLabelController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road-label.controller';
import { IASMapAMapRoadPolylineController } from '../../../../../../share/map/controller/amap/road/ias-map-amap-road-polyline.controller';
import { SystemEventMapContainerAMapMarkerLayerController } from './marker/system-event-map-container-amap-marker-layer.controller';
import { SystemEventMapContainerAMapPointController } from './point/system-event-map-container-amap-point.controller';

export class SystemEventMapContainerAMapController {
  event = {
    point: {
      click: new EventEmitter<MobileEventRecord>(),
    },
  };
  constructor() {
    MapHelper.amap
      .get('system-event-map-container', MapHelper.amap.plugins, true)
      .then((x) => {
        x.setFeatures(['bg', 'road', 'building']);
        this.controller.map.set(x);
        let container: Loca.Container | undefined = undefined;
        try {
          container = new Loca.Container({ map: x });
          this.controller.loca.set(container);
        } catch (error) {
          console.error(error);
        }
        this.init.map(x, container);
      });
  }

  private controller = {
    map: new PromiseValue<AMap.Map>(),
    loca: new PromiseValue<Loca.Container>(),
    road: {
      polyline: new PromiseValue<IASMapAMapRoadPolylineController>(),
      label: new PromiseValue<IASMapAMapRoadLabelController>(),
    },
    info: new PromiseValue<IASMapAMapInfoController>(),
    point: new PromiseValue<SystemEventMapContainerAMapPointController>(),
    marker:
      new PromiseValue<SystemEventMapContainerAMapMarkerLayerController>(),
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
      let info = new IASMapAMapInfoController(map);
      this.controller.info.set(info);
      this.init.marker(map, info);
    },
    marker: (map: AMap.Map, info: IASMapAMapInfoController) => {
      try {
        let controller = new SystemEventMapContainerAMapMarkerLayerController(
          map,
          info
        );

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
        let controller = new SystemEventMapContainerAMapPointController(loca);
        controller.event.move.subscribe((data) => {
          this.regist.point.over(data as MobileEventRecord);
        });
        this.controller.point.set(controller);
      } catch (error) {
        console.error(error);
      }
    },
    road: {
      polyline: (map: AMap.Map) => {
        try {
          let controller = new IASMapAMapRoadPolylineController(map);
          this.controller.road.polyline.set(controller);
        } catch (error) {
          console.error(error);
        }
      },
      label: (map: AMap.Map) => {
        try {
          let controller = new IASMapAMapRoadLabelController(map);
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
    },
    point: {
      over: async (data?: MobileEventRecord) => {
        this.controller.info.get().then((ctr) => {
          if (data && data.Location) {
            let info: IIASMapAMapInfo = {
              Name:
                data.AudioContent ??
                ObjectTool.model.MobileEventRecord.get.name(data),
            };
            if (data.Location) {
              info.Location = [
                data.Location.GCJ02.Longitude,
                data.Location.GCJ02.Latitude,
              ];
            }
            ctr.add(info, undefined, [0, -30]);
          } else {
            ctr.remove();
          }
        });
      },
    },
  };

  road = {
    load: async (datas: Road[], focur: boolean = false) => {
      let polyline = await this.controller.road.polyline.get();
      let label = await this.controller.road.label.get();
      let map = await this.controller.map.get();
      let lines: AMap.Polyline[] = [];
      datas.map((data) => {
        if (data.GeoLine) {
          let points = data.GeoLine.map<[number, number]>((x) => [
            x.Longitude,
            x.Latitude,
          ]);
          lines.push(...polyline.add(data.Id, points));
          label.add(data);
        }
      });
      map.setFitView(lines, true);
    },
  };
  point = {
    datas: [] as MobileEventRecord[],
    load: (datas: MobileEventRecord[]) => {
      this.point.datas = datas.map((x) =>
        ObjectTool.copy(x, MobileEventRecord)
      );
      this.controller.point.get().then((x) => {
        x.load(this.point.datas);
      });
      this.controller.marker.get().then((x) => {
        x.load(this.point.datas);
      });
    },
    reload: async (changed: MobileEventRecord) => {
      let datas = [...this.point.datas];
      let index = datas.findIndex((x) => x.Id === changed.Id);
      if (index >= 0) {
        datas[index] = changed;
      }
      let point = await this.controller.point.get();
      point.clear();
      point.load(datas);
    },
    clear: async () => {
      this.point.datas = [];
      let point = await this.controller.point.get();
      point.clear();
      let marker = await this.controller.marker.get();
      marker.clear();
    },
    focus: async (data: MobileEventRecord) => {
      if (data.Location) {
        let position: [number, number] = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
        this.controller.map.get().then((x) => {
          x.setCenter(position);
          x.setZoom(19.5);
        });
      }
      let marker = await this.controller.marker.get();
      marker.select(data);
    },
    over: async (data: MobileEventRecord) => {
      let marker = await this.controller.marker.get();
      marker.mouseover(data);
    },
    out: async (data: MobileEventRecord) => {
      let marker = await this.controller.marker.get();
      marker.mouseout(data);
    },
  };

  map = {
    view: () => {
      this.controller.map.get().then((map) => {
        map.setFitView(undefined, true);
      });
    },
    destory: () => {
      this.controller.loca.get().then((loca) => {
        loca.destroy();
        this.controller.loca.clear();
        this.controller.map.get().then((map) => {
          map.destroy();
          this.controller.map.clear();
        });
      });
    },
    move: (data: MobileEventRecord) => {
      if (data.Location) {
        let position: [number, number] = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
        this.controller.map.get().then((x) => {
          x.setCenter(position);
        });
      }
    },
  };
}
