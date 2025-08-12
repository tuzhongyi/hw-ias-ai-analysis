import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';

export class IASMapAMapMarkerEvent {
  mouseover = new EventEmitter<IShop>();
  mouseout = new EventEmitter<IShop>();
  click = new EventEmitter<IShop>();
}
