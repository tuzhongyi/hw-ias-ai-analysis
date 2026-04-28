import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import {
  IIdModel,
  ILocation,
} from '../../../../../../../common/data-core/models/interface/model.interface';

export class IASMapAMapMarkerEvent<T extends IIdModel & ILocation = IShop> {
  mouseover = new EventEmitter<T>();
  mouseout = new EventEmitter<T>();
  click = new EventEmitter<T>();
  dblclick = new EventEmitter<T>();
}

export class IASMapAMapPolylineEvent<
  T extends IIdModel & ILocation
> extends IASMapAMapMarkerEvent<T> {
  move = new EventEmitter<T>();
}
