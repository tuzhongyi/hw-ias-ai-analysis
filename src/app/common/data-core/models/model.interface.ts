import 'reflect-metadata';
import { GisPoint } from './arm/gis-point.model';
export interface IModel {}
export interface IIdModel<T = string> extends IModel {
  Id: T;
}
export interface INameModel<T = string> extends IModel {
  Name: T;
}
export interface IIdNameModel<TId = string, TName = string>
  extends IIdModel<TId>,
    INameModel<TName> {}
export interface IGisModel extends IModel {
  Longitude: number;
  Latitude: number;
}
export interface IGisPointModel<T extends IGisModel = GisPoint> extends IModel {
  Location?: T;
}
