import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { ComponentTool } from '../../../../../../../common/tools/component-tool/component.tool';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { IIASMapMarkerEvent } from '../../../../../share/map/ias-map.model';
import { SystemStatisticRoadObjectAMapController } from './amap/system-statistic-road-object-amap.controller';

export class SystemStatisticRoadObjectMapController {
  event = {
    record: {} as IIASMapMarkerEvent<RoadObjectEventRecord>,
  };
  private amap: SystemStatisticRoadObjectAMapController;

  constructor(tool: ComponentTool, subscription: Subscription) {
    this.amap = new SystemStatisticRoadObjectAMapController(tool, subscription);
    this.regist(this.amap);
  }

  private async regist(amap: SystemStatisticRoadObjectAMapController) {
    let marker = await amap.record.marker;
    marker.event.click = (data) => {
      this.event.record.click && this.event.record.click(data);
      this.amap.record.info.simple.then((simple) => {
        simple.remove();
      });
    };
    marker.event.dblclick = (data) => {
      this.event.record.dblclick && this.event.record.dblclick(data);
      this.amap.record.info.simple.then((simple) => {
        simple.remove();
      });
    };
    marker.event.mouseover = (data) => {
      this.event.record.mouseover && this.event.record.mouseover(data);
      this.amap.record.info.details.then((details) => {
        if (!details.opened(data))
          this.amap.record.info.simple.then((simple) => {
            simple.add(data);
          });
      });
    };
    marker.event.mouseout = (data) => {
      this.event.record.mouseout && this.event.record.mouseout(data);
      this.amap.record.info.simple.then((x) => {
        x.remove();
      });
    };

    let info = await amap.record.info.details;
    info.details = (data) => {
      this.event.record.dblclick && this.event.record.dblclick(data);
    };
  }

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
      record.load(datas);
    },
    clear: async () => {
      let record = await this.amap.record.marker;
      record.clear();
    },
    select: async (data: RoadObjectEventRecord) => {
      let marker = await this.amap.record.marker;
      marker.select(data);
      let info = await this.amap.record.info.details;
      info.open(data);
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
    load: async (datas: FileGpsItem[], focus: boolean) => {
      let path = await this.amap.path;
      let positions = datas.map<[number, number]>((x) => {
        return [x.Longitude, x.Latitude];
      });

      path.load(positions, focus, false);
    },
    to: async (datas: FileGpsItem[], record: RoadObjectEventRecord) => {
      let way = await this.amap.way;
      way.clear();
      let closest = ObjectTool.model.RoadObjectEventRecord.findMatchWithFoot(
        datas,
        record,
        1000 * 60
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
      let path = await this.amap.path;
      path.clear();
      let way = await this.amap.way;
      way.clear();
    },
  };

  map = {
    focus: async (datas: any) => {
      let map = await this.amap.map;
      map.setFitView(datas, true);
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
