import { GisPoint } from '../../../../../../../../common/data-core/models/arm/gis-point.model';
import { IASMapAMapPointController } from '../../../../../map/controller/amap/ias-map-amap-point.controller';
import { IIASMapArgs } from '../../../../../map/ias-map.model';

export class VideoPathMapAMapPointController {
  constructor(private map: AMap.Map) {}

  private points: IASMapAMapPointController[] = [];

  load(datas: GisPoint[], args: IIASMapArgs) {
    this.points = datas.map((x) => {
      let point = new IASMapAMapPointController();
      let marker = point.set(x, args);
      this.map.add(marker);
      return point;
    });
  }
  async clear() {
    for (let i = 0; i < this.points.length; i++) {
      const point = this.points[i];
      let marker = await point.marker.get();
      this.map.remove(marker);
    }
    this.points = [];
  }
}
