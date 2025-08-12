import { MobileEventRecord } from '../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';

export class MobileEventRecordModel extends MobileEventRecord {
  Name?: string;
  EventTypeName?: Promise<string>;
}
export enum MobileEventRecordMode {
  shop,
  realtime,
  analysis,
}
