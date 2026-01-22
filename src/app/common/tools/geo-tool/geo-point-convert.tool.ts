import '../../../../assets/js/map/CoordinateTransform.js';
declare var bd09togcj02: any;
declare var gcj02tobd09: any;
declare var wgs84togcj02: any;
declare var gcj02towgs84: any;

export class GeoPointConvertTool {
  bd09 = {
    to: {
      gcj02: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        return bd09togcj02(longitude, latitude);
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
        return gcj02towgs84(longitude, latitude);
      },
    },
  };
  wgs84 = {
    to: {
      gcj02: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        return wgs84togcj02(longitude, latitude);
      },
      bd09: (longitude: number, latitude: number): [number, number] => {
        if (!latitude || !longitude) return [0, 0];
        let gcj02 = wgs84togcj02(longitude, latitude);
        return gcj02tobd09(gcj02[0], gcj02[1]);
      },
    },
  };

  json = {
    points: <T>(datas: [number, number][], source?: T[]) => {
      let geo: any = {
        type: 'FeatureCollection',
        features: datas.map((x, i) =>
          this.json.point(x, source ? source[i] : undefined)
        ),
      };

      return geo;
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
