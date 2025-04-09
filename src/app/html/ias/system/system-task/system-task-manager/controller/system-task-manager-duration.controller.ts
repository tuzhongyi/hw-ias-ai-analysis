import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { TaskDurationValue } from '../system-task-manager.model';

@Injectable()
export class SystemTaskManagerDurationController {
  constructor() {
    this.source = this.init();
  }

  source: EnumNameValue<TaskDurationValue>[];

  private init() {
    let day = new EnumNameValue(TaskDurationValue.day, '当日');
    let week = new EnumNameValue(TaskDurationValue.week, '一周');
    let month = new EnumNameValue(TaskDurationValue.month, '一个月');
    let threemonth = new EnumNameValue(TaskDurationValue.threemonth, '三个月');
    let halfyear = new EnumNameValue(TaskDurationValue.halfyear, '半年');
    let year = new EnumNameValue(TaskDurationValue.year, '一年');

    return [day, week, month, threemonth, halfyear, year];
  }

  get(value: TaskDurationValue, today: Date) {
    switch (value) {
      case TaskDurationValue.day:
        return DateTimeTool.all.day(today);
      case TaskDurationValue.week:
        return DateTimeTool.last.week(today);
      case TaskDurationValue.month:
        return DateTimeTool.last.month(today);
      case TaskDurationValue.threemonth:
        return DateTimeTool.last.month(today, 3);
      case TaskDurationValue.halfyear:
        return DateTimeTool.last.month(today, 6);
      case TaskDurationValue.year:
        return DateTimeTool.last.year(today);
      default:
        throw new Error('TaskDurationValue not found');
    }
  }
}
