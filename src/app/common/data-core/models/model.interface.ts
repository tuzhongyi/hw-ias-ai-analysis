import 'reflect-metadata'
export interface IModel {}
export interface IIdModel<T = string> extends IModel {
  Id: T
}
export interface INameModel extends IModel {
  Name: string
}
export interface IIdNameModel<T = string> extends IIdModel<T>, INameModel {}
