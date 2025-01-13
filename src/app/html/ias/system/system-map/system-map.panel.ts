import { EventEmitter } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Point } from '../../../../common/data-core/models/arm/point.model';
import { SystemMapShopRadiusArgs } from './system-map.model';

export class SystemMapPanel {
  state = new StatePanel();
  position = new PositionPanel();
  source = new SourcePanel();

  editor = {
    circle: new CircleEditorPanel(),
  };
}
class Panel {
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
class StatePanel extends Panel {}
class CircleEditorPanel extends Panel {
  args = new SystemMapShopRadiusArgs();
}
class PositionPanel extends Panel {
  point = new Point();
}
class SourcePanel extends Panel {
  datas: Shop[] = [];
}
