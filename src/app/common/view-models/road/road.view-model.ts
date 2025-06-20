import { Road } from '../../data-core/models/arm/geographic/road.model';
import { GeoDirection } from '../../tools/geo-tool/geo.model';
import { GeoTool } from '../../tools/geo-tool/geo.tool';

export class RoadViewModel extends Road {
  private _Direction?: GeoDirection;
  get Direction() {
    if (!this._Direction) {
      if (this.GeoLine) {
        let line = this.GeoLine.map<[number, number]>((x) => [
          x.Longitude,
          x.Latitude,
        ]);
        this._Direction = GeoTool.point.sort.direction(line);
      }
    }
    return this._Direction;
  }
}
