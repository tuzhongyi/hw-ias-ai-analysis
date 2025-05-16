import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';

export class SystemEventHandleModel {
  [key: string]: boolean;

  misinform = false;
  registrationdelete = false;
  registrationcreate = false;
  registrationmerge = false;
  shopsuspension = false;
  shopoperation = false;
  shopdecoration = false;
  shopmarking = false;
}
export interface ISystemEventHandleResult {
  model: string;
  data: MobileEventRecord;
}
