export enum MapMarkerType {
  other,
  shop,
  passage,
  busstation,
  firehydrant,
  trashcan,
  telephonebooth,
  unknow,
}
export enum MapMarkerColor {
  red = 'red',
  green = 'green',
  blue = 'blue',
  orange = 'orange',
  gray = 'gray',
}

export class MapMarker {
  type = MapMarkerType.other;
  color?: MapMarkerColor;
}

export interface IIASMapArgs {
  type: MapMarkerType;
  color?: MapMarkerColor;
}
