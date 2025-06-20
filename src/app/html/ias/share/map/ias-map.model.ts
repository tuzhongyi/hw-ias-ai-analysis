export enum MapMarkerType {
  other,
  shop,
}
export enum MapMarkerShopColor {
  red = 'red',
  green = 'green',
  blue = 'blue',
  orange = 'orange',
}

export class MapMarker {
  type = MapMarkerType.other;
  color?: MapMarkerShopColor;
}

export interface IIASMapArgs {
  type: MapMarkerType;
  color?: MapMarkerShopColor;
}
