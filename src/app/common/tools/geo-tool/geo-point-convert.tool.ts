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
    },
  };
}
