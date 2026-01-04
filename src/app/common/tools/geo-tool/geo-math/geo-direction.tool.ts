import { GisPoints } from '../../../data-core/models/arm/gis-point.model';
import { IIdModel } from '../../../data-core/models/model.interface';
import { ArrayTool } from '../../array-tool/array.tool';
import { LocaleCompare } from '../../compare-tool/compare.tool';
import { GeoDirection, GeoDirectionSort } from '../geo.model';
import { GeoTool } from '../geo.tool';

export interface IRoad extends IIdModel {
  Direction?: GeoDirection;
}
interface ILocation {
  Location?: GisPoints;
  Road?: IRoad;
}

export class GeoMathDirectionTool {
  private compare<T extends ILocation & IRoad>(
    a: T,
    b: T,
    sort: GeoDirectionSort
  ) {
    if (a.Location && a.Road && b.Location && b.Road) {
      let _a: [number, number] = [
        a.Location.GCJ02.Longitude,
        a.Location.GCJ02.Latitude,
      ];
      let _b: [number, number] = [
        b.Location.GCJ02.Longitude,
        b.Location.GCJ02.Latitude,
      ];

      switch (a.Road.Direction) {
        case GeoDirection.ew:
          return GeoTool.point.sort.longitude(_a, _b, sort.longitude);
        case GeoDirection.ns:
          return GeoTool.point.sort.latitude(_a, _b, sort.latitude);
        default:
          throw new Error('Road.direction');
      }
    }
    return 0;
  }

  sort<T extends ILocation & IRoad>(
    items: T[],
    sort: GeoDirectionSort,
    direction: GeoDirection
  ) {
    let group = ArrayTool.groupBy(items, (x) => {
      return x.Road?.Id ?? '';
    });

    let sorteds: T[][] = [];

    for (let key in group) {
      let items = group[key];
      let sorted = items.sort((a, b) => this.compare(a, b, sort));
      sorteds.push(sorted);
    }

    sorteds = sorteds.sort((a, b) => {
      let _a: GeoDirection | undefined = undefined;
      let _b: GeoDirection | undefined = undefined;
      if (a.length > 0) {
        _a = a[0].Road?.Direction;
      }
      if (b.length > 0) {
        _b = b[0].Road?.Direction;
      }
      return LocaleCompare.compare(_a, _b, direction === GeoDirection.ew);
    });
    if (sorteds.length > 0) {
      return sorteds.reduce((a, b) => a.concat(b));
    }
    return [];
  }
}
