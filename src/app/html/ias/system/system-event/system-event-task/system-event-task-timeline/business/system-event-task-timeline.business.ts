import { Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventTaskTimelineConverter } from './system-event-task-timeline.converter';

@Injectable()
export class SystemEventTaskTimelineBusiness {
  converter = new SystemEventTaskTimelineConverter();

  load(data: MobileEventRecord) {
    return this.converter.convert(data);
  }
}
