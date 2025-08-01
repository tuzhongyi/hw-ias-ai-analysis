import 'reflect-metadata';
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
export interface IGisPointsModel extends IModel {
  WGS84: IGisModel;
  GCJ02: IGisModel;
  BD09: IGisModel;
}
export interface IGisPointModel<T extends IGisPointsModel = IGisPointsModel>
  extends IModel {
  Location?: T;
}
