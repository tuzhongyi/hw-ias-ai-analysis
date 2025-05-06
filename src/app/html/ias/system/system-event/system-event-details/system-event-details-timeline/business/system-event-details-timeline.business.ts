import { Injectable } from '@angular/core';
import { EventRecord } from '../../../../../../../common/data-core/models/arm/event/event-record.model';
import { SystemEventDetailsTimelineConverter } from './system-event-details-timeline.converter';

@Injectable()
export class SystemEventDetailsTimelineBusiness {
  converter = new SystemEventDetailsTimelineConverter();

  load(data: EventRecord) {
    return this.converter.convert(data);
  }
}
