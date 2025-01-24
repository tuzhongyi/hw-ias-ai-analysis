import { EventEmitter } from '@angular/core';
import { Point } from '../../../../common/data-core/models/arm/point.model';

export class SystemMapShopArgs {
  dsitance = new SystemMapShopDistanceArgs();
  filter = new SystemMapShopFilterArgs();

  clear() {
    this.dsitance.enabled = false;
    this.filter.clear();
  }
}

export class SystemMapShopFilterArgs {
  name?: string;
  telphone?: string;
  type?: number;
  camera?: string;
  label?: number;
  state?: number;

  clear() {
    this.name = undefined;
    this.state = undefined;
  }
}

export class SystemMapShopDistanceArgs {
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
