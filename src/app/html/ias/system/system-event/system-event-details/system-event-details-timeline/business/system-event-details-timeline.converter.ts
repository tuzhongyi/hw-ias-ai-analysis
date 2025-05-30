import { formatDate } from '@angular/common';
import { ArmEventType } from '../../../../../../../common/data-core/enums/event/arm-event-type.enum';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { IEChartModel } from './system-event-details-timeline.model';

export class SystemEventDetailsTimelineConverter {
  convert(data: MobileEventRecord) {
    return [
      this.discover(data),
      this.task(data),
      this.processed(data),
      this.handled(data),
    ];
  }

  private discover(data: MobileEventRecord) {
    let model: IEChartModel = {
      name: '',
      value: 0,
    };
    if (data.BeginTime) {
      model.name = formatDate(data.BeginTime, Language.MonthDayHHmmss, 'en');
    } else {
      model.name = formatDate(data.EventTime, Language.MonthDayHHmmss, 'en');
    }
    return model;
  }
  private task(data: MobileEventRecord) {
    let model: IEChartModel = {
      name: '',
      value: 0,
    };
    if (data.Assignment) {
      if (data.Assignment.Assigned && data.Assignment.AssignmentTime) {
        model.name = formatDate(
          data.Assignment.AssignmentTime,
          Language.MonthDayHHmmss,
          'en'
        );
      }
    }

    switch (data.EventType) {
      case ArmEventType.ShopSignCreated:
      case ArmEventType.ShopSignDisappeared:
        if (!model.name) {
          model.name = formatDate(
            data.EventTime,
            Language.MonthDayHHmmss,
            'en'
          );
        }
        break;
      default:
        break;
    }

    return model;
  }

  private processed(data: MobileEventRecord) {
    let model: IEChartModel = {
      name: '',
      value: 0,
    };
    if (
      data.Assignment &&
      data.Assignment.Handled &&
      data.Assignment.HandledTime
    ) {
      model.name = formatDate(
        data.Assignment.HandledTime,
        Language.MonthDayHHmmss,
        'en'
      );
    }
    return model;
  }

  private handled(data: MobileEventRecord) {
    let model: IEChartModel = {
      name: '',
      value: 0,
    };
    if (
      data.Assignment &&
      data.Assignment.Handled &&
      data.Assignment.HandledTime
    ) {
      model.name = formatDate(
        data.Assignment.HandledTime,
        Language.MonthDayHHmmss,
        'en'
      );
    }
    return model;
  }
}
