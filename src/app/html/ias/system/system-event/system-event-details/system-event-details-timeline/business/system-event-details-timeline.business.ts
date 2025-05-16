import { Injectable } from '@angular/core';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { SystemEventDetailsTimelineConverter } from './system-event-details-timeline.converter';

@Injectable()
export class SystemEventDetailsTimelineBusiness {
  converter = new SystemEventDetailsTimelineConverter();

  load(data: MobileEventRecord) {
    return this.converter.convert(data);
  }
}
