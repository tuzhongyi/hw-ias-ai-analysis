import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { GeoPoint } from '../../../../../../../../common/tools/geo-tool/geo.model';

export class SystemAMapShopMarkerEvent {
  mouseover = new EventEmitter<IShop>();
  mouseout = new EventEmitter<IShop>();
  click = new EventEmitter<IShop>();
}

export interface ISystemAMapShopIconController {
  get(args: any): {
    normal: AMap.LabelMarkerIconOptions;
    hover: AMap.LabelMarkerIconOptions;
    selected: AMap.LabelMarkerIconOptions;
  };
}

export interface ISystemAMapShopLabelMarkerController {
  event: SystemAMapShopMarkerEvent;
  marker: AMap.LabelMarker;
  selected: boolean;
  data: IShop;
  hover(): void;
  out(): void;
  select(): void;
  blur(): void;
}
export interface ISystemAMapShopMarkerInfo {
  Name: string;
  Location?: GeoPoint;
}
