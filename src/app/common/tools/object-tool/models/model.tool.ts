import { FileGpsItemTool } from './file-gps-item.tool';
import { MobileEventRecordTool } from './mobile-event-record.tool';
import { RoadObjectEventRecordTool } from './road-object-event-record.tool';

export class ModelTool {
  MobileEventRecord = new MobileEventRecordTool();
  RoadObjectEventRecord = new RoadObjectEventRecordTool();
  FileGpsItem = new FileGpsItemTool();
}
