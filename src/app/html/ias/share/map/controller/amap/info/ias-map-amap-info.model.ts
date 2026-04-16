import { GeoPoint } from '../../../../../../../common/tools/geo-tool/geo.model';

export interface IIASMapAMapInfo {
  Name: string;
  Location?: GeoPoint;
}
export interface IIASMapAMapInfoController {
  remove(): void;
  add(...args: any[]): void;
}
