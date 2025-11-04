import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { TaskDuration } from '../../../../../../../common/storage/system-compare-storage/system-compare.storage';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';

@Injectable()
export class SystemTaskManagerDurationController {
  constructor() {
    this.source = this.init();
  }

  source: EnumNameValue<TaskDuration>[];

  private init() {
    let day = new EnumNameValue(TaskDuration.day, '当日');
    let week = new EnumNameValue(TaskDuration.week, '一周');
    let month = new EnumNameValue(TaskDuration.month, '一个月');
    let threemonth = new EnumNameValue(TaskDuration.treemonth, '三个月');
    let halfyear = new EnumNameValue(TaskDuration.halfyear, '半年');
    let year = new EnumNameValue(TaskDuration.year, '一年');

    return [day, week, month, threemonth, halfyear, year];
  }

  get(value: TaskDuration, today: Date) {
    switch (value) {
      case TaskDuration.day:
        return DateTimeTool.all.day(today);
      case TaskDuration.week:
        return DateTimeTool.last.week(today);
      case TaskDuration.month:
        return DateTimeTool.last.month(today);
      case TaskDuration.treemonth:
        return DateTimeTool.last.month(today, 3);
      case TaskDuration.halfyear:
        return DateTimeTool.last.month(today, 6);
      case TaskDuration.year:
        return DateTimeTool.last.year(today);
      default:
        throw new Error('TaskDuration not found');
    }
  }
}
