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
  longitude = GeoLongitudeDirection.east2west;
  latitude = GeoLatitudeDirection.north2south;
}

export enum GeoDirection {
  ew,
  ns,
}
