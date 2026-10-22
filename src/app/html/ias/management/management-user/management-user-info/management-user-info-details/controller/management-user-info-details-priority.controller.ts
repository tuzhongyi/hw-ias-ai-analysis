import { EventEmitter, Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';

@Injectable()
export class ManagementUserInfoDetailsPriorityController {
  select = new EventEmitter<string[]>();

  show = false;
  selected: EnumNameValue<string>[] = [];

  /** 回填选中项。传进来的必须是权限列表里的对象（勾选靠引用相等） */
  set(selected: EnumNameValue<string>[]) {
    this.selected = selected;
    // 同步 data.Priorities：界面上看到的勾选就是最终提交的内容
    this.emit();
  }
  onselected(selected: EnumNameValue<string>[]) {
    this.selected = selected;
    this.emit();
  }
  onremove(items: EnumNameValue<string>[]) {
    this.selected = this.selected.filter((x) => !items.includes(x));
    this.emit();
  }

  /**
   * 提交给 User.Priorities 的永远是字符串。
   * PriorityTypes 的 Value 经 class-transformer 已变成数字，直接发数字服务端不认
   */
  private emit() {
    this.select.emit(this.selected.map((x) => `${x.Value}`));
  }
}
