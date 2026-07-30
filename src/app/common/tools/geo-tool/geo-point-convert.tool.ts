import '../../../../assets/js/map/CoordinateTransform.js';
import { CoordinateTransform } from './geo-point-transform.js';

declare var bd09togcj02: any;
declare var gcj02tobd09: any;
declare var wgs84togcj02: any;
declare var gcj02towgs84: any;

export class GeoPointConvertTool {
  transform = new CoordinateTransform();

  bd09 = {
    to: {
      gcj02: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        return bd09togcj02(longitude, latitude);
      },
      wgs84: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        let gcj02 = bd09togcj02(longitude, latitude);
        return gcj02towgs84(gcj02[0], gcj02[1]);
      },
    },
  };
  gcj02 = {
    to: {
      bd09: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        return gcj02tobd09(longitude, latitude);
      },
      wgs84: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        let point = this.transform.Gcj2Wgs_AnalyticDiff(longitude, latitude);
        return [point.lon, point.lat];
      },
    },
  };
  wgs84 = {
    to: {
      gcj02: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        let point = this.transform.Wgs2Gcj(longitude, latitude);
        return [point.lon, point.lat];
      },
      bd09: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        let gcj02 = this.transform.Wgs2Gcj(longitude, latitude);
        return gcj02tobd09(gcj02.lon, gcj02.lat);
      },
    },
  };

  json = {
    points: <T>(datas: [number, number][], source?: T[]) => {
      const features: any[] = [];
      for (let i = 0; i < datas.length; i++) {
        const x = datas[i];
        if (x && typeof x[0] === 'number' && typeof x[1] === 'number') {
          features.push(
            this.json.point(x, source ? source[i] : undefined),
          );
        }
      }
      return {
        type: 'FeatureCollection' as const,
        features,
      };
    },
    point: <T>(data: [number, number], source?: T) => {
      let geo = {
        type: 'Feature',
        properties: source,
        geometry: {
          type: 'Point',
          coordinates: [...data],
        },
      };
      return geo;
    },
    line: () => {},
  };
}
