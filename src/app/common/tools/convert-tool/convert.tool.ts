import { ConvertEventRecordTool } from './convert-event-record.tool';
import { ConvertShopTool } from './convert-shop.tool';

export class ConvertTool {
  static shop = new ConvertShopTool();
  static event = {
    record: new ConvertEventRecordTool(),
  };
}
