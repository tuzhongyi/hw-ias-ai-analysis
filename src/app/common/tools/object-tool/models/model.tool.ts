import { FileGpsItemTool } from './file-gps-item.tool';
import { GisPointMatchResultTool } from './gis-point-match-result.tool';
import { MobileEventRecordTool } from './mobile-event-record.tool';
import { RoadObjectEventRecordTool } from './road-object-event-record.tool';

export class ModelTool {
  MobileEventRecord = new MobileEventRecordTool();
  RoadObjectEventRecord = new RoadObjectEventRecordTool();
  FileGpsItem = new FileGpsItemTool();
  GisPointMatchResult = new GisPointMatchResultTool();
}
