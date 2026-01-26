export enum MapMarkerType {
  other,
  shop,
  roadobject,
}
export enum MapMarkerColor {
  red = 'red',
  green = 'green',
  blue = 'blue',
  orange = 'orange',
}

export class MapMarker {
  type = MapMarkerType.other;
  color?: MapMarkerColor;
}

export interface IIASMapArgs {
  type: MapMarkerType;
  color?: MapMarkerColor;
}
