import { EventEmitter } from '@angular/core';
import { ShopObjectState } from '../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Point } from '../../../../common/data-core/models/arm/point.model';

export class SystemMapShopArgs {
  radius?: SystemMapShopRadiusArgs;
  filter = new SystemMapShopFilterArgs();

  clear() {
    this.radius = undefined;
    this.filter.clear();
  }
}

export class SystemMapShopFilterArgs {
  name?: string;
  states: ShopObjectState[] = [];

  clear() {
    this.name = undefined;
    this.states = [];
  }
}

export class SystemMapShopRadiusArgs {
  center = Point.create();
  distance = 0;
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
