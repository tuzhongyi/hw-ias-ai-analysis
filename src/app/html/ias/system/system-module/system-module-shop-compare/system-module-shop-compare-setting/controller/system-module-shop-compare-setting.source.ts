import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { TaskDuration } from '../../../../../../../common/storage/system-compare-storage/system-compare.storage';

@Injectable()
export class SystemModuleShopCompareSettingSource {
  duration: EnumNameValue<TaskDuration>[];

  constructor() {
    this.duration = this.load();
  }
  private load() {
    let day = new EnumNameValue(TaskDuration.day, '今日');
    let week = new EnumNameValue(TaskDuration.week, '一周');
    let month = new EnumNameValue(TaskDuration.month, '一个月');
    let treemonth = new EnumNameValue(TaskDuration.treemonth, '三个月');
    let halfyear = new EnumNameValue(TaskDuration.halfyear, '半年');
    let year = new EnumNameValue(TaskDuration.year, '一年');

    return [day, week, month, treemonth, halfyear, year];
  }
}
