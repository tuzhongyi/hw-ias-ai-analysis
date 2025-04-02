export type GeoPoint = [number, number];
export type GeoLine = [GeoPoint, GeoPoint];
export type GeoPolyline = GeoPoint[];

export enum GeoLongitudeDirection {
  east2west = 'ew',
  west2east = 'we',
}

export enum GeoLatitudeDirection {
  north2south = 'ns',
  south2north = 'sn',
}

export class GeoDirectionSort {
  lon = GeoLongitudeDirection.east2west;
  lat = GeoLatitudeDirection.north2south;
}

export enum GeoDirection {
  ew,
  ns,
}
