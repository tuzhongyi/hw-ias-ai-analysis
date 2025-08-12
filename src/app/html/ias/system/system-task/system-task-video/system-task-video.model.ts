import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { GetTaskRecordFileGpsItemsParams } from '../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';

export class SystemTaskVideoArgs extends GetTaskRecordFileGpsItemsParams {
  TaskId!: string;
  Detected?: boolean;
  Point?: GisPoint;
  override Channel = 1;
  override Duration = 5;
}
