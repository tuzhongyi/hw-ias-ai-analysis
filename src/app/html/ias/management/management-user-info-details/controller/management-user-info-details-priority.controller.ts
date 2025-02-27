import { EventEmitter, Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';

@Injectable()
export class ManagementUserInfoDetailsPriorityController {
  select = new EventEmitter<string[]>();

  show = false;
  selected: EnumNameValue<string>[] = [];

  onselected(selected: EnumNameValue<string>[]) {
    this.selected = selected;
    this.select.emit(this.selected.map((x) => x.Value));
  }
  onremove(items: EnumNameValue<string>[]) {
    this.selected = this.selected.filter((x) => !items.includes(x));
    this.select.emit(this.selected.map((x) => x.Value));
  }
}
