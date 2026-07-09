import { GisPointMatchResult } from '../../../../../../../../../common/data-core/models/arm/geographic/patrol/gis-point-match-result.model';
import { ObjectTool } from '../../../../../../../../../common/tools/object-tool/object.tool';
import { IASMapAMapConfig } from '../../../../../../../share/map/controller/amap/ias-map-amap.config';

export class SystemModuleMobileDeviceRouteAMapMatchController {
  constructor(private map: AMap.Map) {}

  private polylines: AMap.Polyline[] = [];

  load(datas: GisPointMatchResult[][][]) {
    this.clear();

    for (const section of datas) {
      for (const segment of section) {
        let groups = ObjectTool.model.GisPointMatchResult.split(segment);
        for (const group of groups) {
          let positions = group.map(
            (x) => [x.Longitude, x.Latitude] as [number, number],
          );
          if (positions.length >= 2) {
            let type = group.every((x) => x.Matched) ? 1 : 0;
            let polyline = new AMap.Polyline({
              path: positions,
              showDir: false,
              strokeWeight: 6,
              strokeColor: IASMapAMapConfig.path.color[type],
              strokeOpacity: 0.6,
              lineJoin: 'round',
              lineCap: 'round',
              bubble: true,
            });
            this.map.add(polyline);
            this.polylines.push(polyline);
          }
        }
      }
    }
    return this.polylines;
  }

  clear() {
    if (this.polylines.length > 0) {
      this.map.remove(this.polylines);
      this.polylines = [];
    }
  }
}
