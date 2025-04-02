import { EventEmitter, Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { SystemMapPanel } from '../../system-map.model';

@Injectable()
export class SystemMapPanelStateController extends SystemMapPanel {
  selected = new EventEmitter<ShopObjectState[]>();
  constructor() {
    super();
    this.show = true;
  }

  selecteds = [
    ShopObjectState.Disappeared,
    ShopObjectState.Created,
    ShopObjectState.Existed,
  ];

  onselect() {
    this.selected.emit(this.selecteds);
  }

  reset() {
    this.selecteds = [
      ShopObjectState.Disappeared,
      ShopObjectState.Created,
      ShopObjectState.Existed,
    ];
  }
}
