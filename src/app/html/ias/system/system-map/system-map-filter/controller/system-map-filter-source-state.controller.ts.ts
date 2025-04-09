import { EventEmitter, Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';

@Injectable()
export class SystemMapFilterSourceStateController {
  constructor() {}

  select = new EventEmitter<ShopObjectState[]>();
  inited = new EventEmitter<void>();

  show = false;
  selected: EnumNameValue<ShopObjectState>[] = [];

  async init(datas: EnumNameValue<ShopObjectState>[]) {
    Promise.resolve().then((x) => {
      let created = datas.find(
        (x) => x.Value === ShopObjectState.Created
      ) as EnumNameValue<ShopObjectState>;
      let disappeared = datas.find(
        (x) => x.Value === ShopObjectState.Disappeared
      ) as EnumNameValue<ShopObjectState>;
      this.selected = [created, disappeared];
      this.select.emit(this.selected.map((x) => x.Value));
      this.inited.emit();
    });
  }

  onselected(selected: EnumNameValue<ShopObjectState>[]) {
    this.selected = selected;
    this.select.emit(this.selected.map((x) => x.Value));
  }
  onremove(items: EnumNameValue<ShopObjectState>[]) {
    this.selected = this.selected.filter((x) => !items.includes(x));
    this.select.emit(this.selected.map((x) => x.Value));
  }
}
