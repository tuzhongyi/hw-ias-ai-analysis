import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class SystemModuleShopManagerDurationController {
  constructor() {}

  load() {
    let today = new Date();
    let day = new EnumNameValue(DateTimeTool.all.day(today), '今日');
    let week = new EnumNameValue(DateTimeTool.last.week(today), '近七日');
    let month = new EnumNameValue(DateTimeTool.last.month(today), '近一个月');
    let year = new EnumNameValue(DateTimeTool.last.year(today), '近一年');
    let halfyear = new EnumNameValue(
      DateTimeTool.last.month(today, 6),
      '近半年'
    );

    return [day, week, month, halfyear, year];
  }
}
