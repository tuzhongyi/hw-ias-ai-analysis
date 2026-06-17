import { Subscription } from 'rxjs';
import { RoadObjectEventType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { ComponentTool } from '../../../../../../../common/tools/component-tool/component.tool';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import {
  IIASMapMarkerClusterEvent,
  IIASMapMarkerEvent,
} from '../../../../../share/map/ias-map.model';
import { SystemStatisticRoadObjectAMapController } from './amap/system-statistic-road-object-amap.controller';

export class SystemStatisticRoadObjectMapController {
  event = {
    record: {} as IIASMapMarkerEvent<RoadObjectEventRecord>,
    cluster: {} as IIASMapMarkerClusterEvent<RoadObjectEventRecord>,
  };
  private amap: SystemStatisticRoadObjectAMapController;

  constructor(
    tool: ComponentTool,
    private subscription: Subscription,
    private manager: Manager,
  ) {
    this.amap = new SystemStatisticRoadObjectAMapController(
      tool,
      subscription,
      manager,
    );
    this.regist.all(this.amap);
  }

  private async isline(data: RoadObjectEventRecord) {
    let lines = await this.manager.source.road.object.LineObjectTypes.get();
    return lines.some((x) => x.Value == data.RoadObjectType);
  }

  private regist = {
    all: (amap: SystemStatisticRoadObjectAMapController) => {
      this.regist.marker(amap);
      this.regist.info(amap);
      this.regist.cluster(amap);
    },
    info: async (amap: SystemStatisticRoadObjectAMapController) => {
      let info = await amap.record.info.details;
      info.details = (data) => {
        this.event.record.dblclick && this.event.record.dblclick(data);
      };
    },
    marker: async (amap: SystemStatisticRoadObjectAMapController) => {
      let marker = await amap.record.marker;
      let sub_click = marker.event.click.subscribe((data) => {
        this.event.record.click && this.event.record.click(data);
        this.amap.record.info.simple.then((simple) => {
          simple.remove();
        });
      });
      this.subscription.add(sub_click);
      let sub_dblclick = marker.event.dblclick.subscribe((data) => {
        this.event.record.dblclick && this.event.record.dblclick(data);
        this.amap.record.info.simple.then((simple) => {
          simple.remove();
        });
      });
      this.subscription.add(sub_dblclick);
      let sub_mouseover = marker.event.mouseover.subscribe((data) => {
        this.event.record.mouseover && this.event.record.mouseover(data);
        this.amap.record.info.details.then((details) => {
          if (!details.opened(data))
            this.amap.record.info.simple.then((simple) => {
              this.isline(data).then((x) => {
                simple.add(data, x);
              });
            });
        });
      });
      this.subscription.add(sub_mouseover);
      let sub_mouseout = marker.event.mouseout.subscribe((data) => {
        this.event.record.mouseout && this.event.record.mouseout(data);
        this.amap.record.info.simple.then((x) => {
          x.remove();
        });
      });
      this.subscription.add(sub_mouseout);
    },
    cluster: async (amap: SystemStatisticRoadObjectAMapController) => {
      let cluster = await amap.record.cluster;
      let sub_click = cluster.event.click.subscribe(async (datas) => {
        this.event.cluster.click && this.event.cluster.click(datas);
        this.amap.record.info.simple.then((simple) => {
          simple.remove();
        });
        if (datas.length > 0) {
          let info = await this.amap.record.info.details;
          let last = datas[datas.length - 1];
          let isline = await this.isline(last);
          await info.open(datas, isline);
          if (last.Location) {
            let position: [number, number] = [
              last.Location.GCJ02.Longitude,
              last.Location.GCJ02.Latitude,
            ];
            this.map.move(position);
          }
        }
      });
      this.subscription.add(sub_click);
      let sub_dblclick = cluster.event.dblclick.subscribe((datas) => {
        if (datas.length > 0) {
          let last = datas[datas.length - 1];
          this.event.record.dblclick && this.event.record.dblclick(last);
        }
        this.amap.record.info.simple.then((simple) => {
          simple.remove();
        });
      });
      this.subscription.add(sub_dblclick);
      let sub_mouseover = cluster.event.mouseover.subscribe((datas) => {
        this.event.cluster.mouseover && this.event.cluster.mouseover(datas);
        this.amap.record.info.details.then((details) => {
          if (datas.length > 0) {
            let last =
              datas.find((x) => x.EventType === RoadObjectEventType.Breakage) ??
              datas.reduce((latest, item) =>
                item.EventTime > latest.EventTime ? item : latest,
              );
            if (!details.opened(last))
              this.amap.record.info.simple.then((simple) => {
                this.isline(last).then((x) => {
                  simple.add(last, x);
                });
              });
          }
        });
      });
      this.subscription.add(sub_mouseover);
      let sub_mouseout = cluster.event.mouseout.subscribe((data) => {
        this.event.cluster.mouseout && this.event.cluster.mouseout(data);
        this.amap.record.info.simple.then((x) => {
          x.remove();
        });
      });
      this.subscription.add(sub_mouseout);
    },
  };

  road = {
    load: async (datas: Road[]) => {
      let road = await this.amap.road;
      return road.load(datas);
    },
    clear: async () => {
      let road = await this.amap.road;
      road.clear();
    },
  };

  record = {
    load: async (datas: RoadObjectEventRecord[]) => {
      let record = await this.amap.record.marker;
      return record.load(datas);
    },
    clear: async () => {
      let record = await this.amap.record.marker;
      record.clear();
    },
    select: async (data: RoadObjectEventRecord) => {
      let marker = await this.amap.record.marker;
      marker.select(data);
      let info = await this.amap.record.info.details;
      let isline = await this.isline(data);
      await info.open([data], isline);
      if (data.Location) {
        let position: [number, number] = [
          data.Location.GCJ02.Longitude,
          data.Location.GCJ02.Latitude,
        ];
        this.map.move(position);
      }
    },
    blur: async () => {
      let info = await this.amap.record.info.details;
      info.close();
    },
  };

  path = {
    load: async (datas: FileGpsItem[][]) => {
      this.amap.path.load(datas);
    },
    to: async (datas: FileGpsItem[], record: RoadObjectEventRecord) => {
      let way = await this.amap.way;
      way.clear();
      let closest = ObjectTool.model.RoadObjectEventRecord.findMatchWithFoot(
        datas,
        record,
        1000 * 60,
      );

      if (closest) {
        let index = closest.footPoint?.segment.startIndex ?? 0;
        let path = datas.slice(0, index + 1).map<[number, number]>((x) => {
          return [x.Longitude, x.Latitude];
        });
        if (closest.footPoint) {
          path.push(closest.footPoint.point);
        }
        way.load(path);
      }
    },
    clear: async () => {
      this.amap.path.clear();
      let way = await this.amap.way;
      way.clear();
    },
  };

  map = {
    focus: async () => {
      let map = await this.amap.map;
      let overlays: any[] = [];

      // 收集 marker 覆盖物
      let markerLayer = await this.amap.record.marker;
      overlays.push(...markerLayer.markers);

      // 收集 path polyline 覆盖物
      overlays.push(...this.amap.polylines);

      if (overlays.length > 0) {
        map.setFitView(overlays, true);
      }
      let center = map.getCenter();
      return [center.lng, center.lat] as [number, number];
    },
    move: (position: [number, number], zoom?: number) => {
      this.amap.map.then((map) => {
        map.setCenter(new AMap.LngLat(position[0], position[1]), false, 250);
        if (zoom) {
          map.setZoom(zoom);
        }
      });
    },
    destroy: async () => {
      await this.road.clear();
      await this.record.clear();
      await this.path.clear();
      let amap = await this.amap.map;
      amap.destroy();
    },
  };
}
