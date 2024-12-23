import { EventEmitter, Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';

@Injectable()
export class SystemModuleShopManagerStateController {
  constructor() {}

  select = new EventEmitter<ShopObjectState[]>();
  inited = new EventEmitter<void>();

  show = false;
  selected: EnumNameValue<ShopObjectState>[] = [];

  async init(datas: EnumNameValue<ShopObjectState>[]) {
    let created = datas.find(
      (x) => x.Value === ShopObjectState.Created
    ) as EnumNameValue<ShopObjectState>;
    let disappeared = datas.find(
      (x) => x.Value === ShopObjectState.Disappeared
    ) as EnumNameValue<ShopObjectState>;
    this.selected = [created, disappeared];
    this.onselected();
    this.inited.emit();
  }

  onselected() {
    this.select.emit(this.selected.map((x) => x.Value));
  }
}
