import { EventEmitter, Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { LocalStorage } from '../../../../../../../common/storage/local.storage';
import { ISystemCompareStorage } from '../../../../../../../common/storage/system-compare-storage/system-compare.storage';

@Injectable()
export class SystemModuleShopCompareManagerStateController {
  select = new EventEmitter<ShopObjectState[]>();
  inited = new EventEmitter<void>();

  show = false;
  selected: EnumNameValue<ShopObjectState>[] = [];

  constructor(private local: LocalStorage) {
    this.storage = this.local.system.compare.get();
  }

  private storage: ISystemCompareStorage;

  async init(datas: EnumNameValue<ShopObjectState>[]) {
    Promise.resolve().then((x) => {
      let states = this.storage.states;
      this.selected = [];

      states.forEach((state) => {
        let selected = datas.find((x) => x.Value === state);
        if (selected) {
          this.selected.push(selected);
        }
      });
      this.select.emit(this.selected.map((x) => x.Value));
      this.inited.emit();
    });
  }

  onselected(selected: EnumNameValue<ShopObjectState>[]) {
    this.selected = selected.sort((a, b) => a.Value - b.Value);
    let states = this.selected.map((x) => x.Value);
    this.select.emit(states);
    this.storage.states = states;
    this.local.system.compare.set(this.storage);
  }
  onremove(items: EnumNameValue<ShopObjectState>[]) {
    this.selected = this.selected
      .filter((x) => !items.includes(x))
      .sort((a, b) => a.Value - b.Value);
    let states = this.selected.map((x) => x.Value);
    this.select.emit(states);
    this.storage.states = states;
    this.local.system.compare.set(this.storage);
  }
}
