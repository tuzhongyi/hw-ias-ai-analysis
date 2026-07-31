import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { GisPoint } from '../../../../../../../common/data-core/models/arm/gis-point.model';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadLabelController } from './ias-map-amap-road-label.scatter';

import { IASMapAMapRoadPolylineController } from './ias-map-amap-road-polyline.controller';

export class IASMapAMapRoadController {
  constructor(map: AMap.Map, private loca: Loca.Container) {
    this.init.set(map);
  }

  private controller = {
    polyline: new PromiseValue<IASMapAMapRoadPolylineController>(),
    labels: new Map<string, IASMapAMapRoadLabelController>(),
  };

  private init = {
    set: (map: AMap.Map) => {
      this.init.polyline(map);
    },
    polyline: (map: AMap.Map) => {
      try {
        let polyline = new IASMapAMapRoadPolylineController(map);
        this.controller.polyline.set(polyline);
      } catch (error) {
        console.error(error);
      }
    },
  };

  async load(datas: Road[]) {
    let polyline = await this.controller.polyline.get();

    let polylines: AMap.Polyline[] = [];
    datas.forEach((data) => {
      if (data.GeoLine && data.GeoLine.length > 0) {
        let points = this.get.points(data.GeoLine);
        let item = polyline.add(data.Id, points);
        polylines.push(...item);
        let label = new IASMapAMapRoadLabelController(this.loca, data);
        this.controller.labels.set(data.Id, label);
      }
    });

    return polylines;
  }

  private get = {
    points: (datas: GisPoint[]) => {
      let points = datas.map<[number, number]>((x) => [
        x.Longitude,
        x.Latitude,
      ]);
      return points;
    },
  };

  select(road: Road) {
    this.controller.polyline.get().then((x) => {
      x.select(road.Id);
    });
  }
  blur() {
    this.controller.polyline.get().then((x) => {
      x.blur();
    });
  }
  focus(road: Road) {
    this.controller.polyline.get().then((x) => {
      x.focus(road.Id);
    });
  }
  async reload(datas: Road[]) {
    let polyline = await this.controller.polyline.get();

    let ids = datas.map((x) => x.Id);
    polyline.blur();

    for (let i = 0; i < datas.length; i++) {
      if (this.controller.labels.has(datas[i].Id)) {
        continue;
      }

      let label = new IASMapAMapRoadLabelController(this.loca, datas[i]);
      this.controller.labels.set(datas[i].Id, label);
    }

    this.controller.labels.forEach((x) => {
      if (!ids.includes(x.data.Id)) {
        x.clear();
        this.controller.labels.delete(x.data.Id);
      }
    });

    polyline.ignore(ids);
  }
  clear() {
    this.controller.polyline.get().then((x) => {
      x.clear();
    });
    this.controller.labels.forEach((x) => {
      x.clear();
    });
    this.controller.labels.clear();
  }
}
