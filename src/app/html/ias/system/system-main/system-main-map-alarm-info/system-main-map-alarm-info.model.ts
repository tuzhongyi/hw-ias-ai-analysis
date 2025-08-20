import { EventEmitter } from '@angular/core';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';

export interface SystemMainMapAlarmInfoInput {
  data?: MobileEventRecord;
}
export interface SystemMainMapAlarmInfoOutput {
  close: EventEmitter<void>;
  video: EventEmitter<MobileEventRecord>;
  image: EventEmitter<MobileEventRecord>;
}
