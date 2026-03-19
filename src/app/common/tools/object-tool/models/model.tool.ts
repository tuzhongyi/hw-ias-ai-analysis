import { MobileEventRecordTool } from './mobile-event-record.tool';
import { RoadObjectEventRecordTool } from './road-object-event-record.tool';

export class ModelTool {
  MobileEventRecord = new MobileEventRecordTool();
  RoadObjectEventRecord = new RoadObjectEventRecordTool();
}
