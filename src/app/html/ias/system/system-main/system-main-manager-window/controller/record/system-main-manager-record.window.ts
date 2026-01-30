import { SystemMainManagerRecordRealtimeWindow } from './system-main-manager-record-realtime.window';
import { SystemMainManagerRecordRoadobjectWindow } from './system-main-manager-record-roadobject.window';
import { SystemMainManagerRecordSampleWindow } from './system-main-manager-record-sample.window';
import { SystemMainManagerRecordShopWindow } from './system-main-manager-record-shop.window';

export class SystemMainManagerRecordWindow {
  realtime = new SystemMainManagerRecordRealtimeWindow();
  shop = new SystemMainManagerRecordShopWindow();
  sample = new SystemMainManagerRecordSampleWindow();
  roadobject = new SystemMainManagerRecordRoadobjectWindow();
}
