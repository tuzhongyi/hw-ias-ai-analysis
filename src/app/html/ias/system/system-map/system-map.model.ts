import { EventEmitter } from '@angular/core';
import { Point } from '../../../../common/data-core/models/arm/point.model';
import { SystemMapRoadArgs } from './business/system-map-road.model';
import { SystemMapShopArgs } from './business/system-map-shop.model';

export enum SystemMapFilterType {
  shop,
  road,
}

export class SystemMapArgs {
  shop = new SystemMapShopArgs();
  road = new SystemMapRoadArgs();
  distance = new SystemMapDistanceArgs();

  public get name(): string | undefined {
    return this.shop.name;
  }
  public set name(v: string | undefined) {
    this.shop.name = v;
    this.road.name = v;
  }
}

export class SystemMapDistanceArgs {
  center = Point.create();
  distance = 0;
  enabled = false;
}

export class SystemMapPanel {
  private _show = false;
  get show() {
    return this._show;
  }
  set show(value: boolean) {
    if (this._show === value) return;
    this._show = value;
    this.change.emit(value);
  }
  change = new EventEmitter<boolean>();
}
