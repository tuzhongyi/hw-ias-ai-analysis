import { GetTaskRecordFileGpsItemsParams } from '../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';

export class SystemTaskVideoArgs extends GetTaskRecordFileGpsItemsParams {
  TaskId!: string;
  override Channel = 1;
}
