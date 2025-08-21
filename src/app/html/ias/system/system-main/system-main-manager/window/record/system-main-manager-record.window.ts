import { SystemMainManagerRecordAnalysisWindow } from './system-main-manager-record-analysis.window';
import { SystemMainManagerRecordRealtimeWindow } from './system-main-manager-record-realtime.window';
import { SystemMainManagerRecordShopWindow } from './system-main-manager-record-shop.window';

export class SystemMainManagerRecordWindow {
  realtime = new SystemMainManagerRecordRealtimeWindow();
  shop = new SystemMainManagerRecordShopWindow();
  analysis = new SystemMainManagerRecordAnalysisWindow();
}
