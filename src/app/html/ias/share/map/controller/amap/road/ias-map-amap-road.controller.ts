import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { IASMapAMapRoadLabelController } from './ias-map-amap-road-label.controller';
import { IASMapAMapRoadPolylineController } from './ias-map-amap-road-polyline.controller';

export class IASMapAMapRoadController {
  constructor(map: AMap.Map) {
    this.init.set(map);
  }

  private controller = {
    polyline: new PromiseValue<IASMapAMapRoadPolylineController>(),
    label: new PromiseValue<IASMapAMapRoadLabelController>(),
  };

  private init = {
    set: (map: AMap.Map) => {
      this.init.polyline(map);
      this.init.label(map);
    },
    polyline: (map: AMap.Map) => {
      try {
        let polyline = new IASMapAMapRoadPolylineController(map);
        this.controller.polyline.set(polyline);
      } catch (error) {
        console.error(error);
      }
    },
    label: (map: AMap.Map) => {
      try {
        let label = new IASMapAMapRoadLabelController(map);
        this.controller.label.set(label);
      } catch (error) {
        console.error(error);
      }
    },
  };

  async load(datas: Road[]) {
    let polyline = await this.controller.polyline.get();
    let label = await this.controller.label.get();
    let polylines: AMap.Polyline[] = [];
    datas.forEach((data) => {
      if (data.GeoLine) {
        let points = data.GeoLine.map<[number, number]>((x) => [
          x.Longitude,
          x.Latitude,
        ]);
        let item = polyline.add(data.Id, points);
        polylines.push(...item);
        label.add(data);
      }
    });
    return polylines;
  }
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
    let label = await this.controller.label.get();
    let ids = datas.map((x) => x.Id);
    polyline.blur();
    label.ignore(ids);
    polyline.ignore(ids);
  }
  clear() {
    this.controller.polyline.get().then((x) => {
      x.clear();
    });
    this.controller.label.get().then((x) => {
      x.clear();
    });
  }
}
