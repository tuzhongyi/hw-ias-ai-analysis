import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../common/data-core/requests/services/analysis/analysis.service';
import {
  GetTaskRecordFileGpsItemsParams,
  GetTaskRecordFileParams,
} from '../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { SystemTaskVideoArgs } from './system-task-video.model';

@Injectable()
export class SystemTaskVideoBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(args: SystemTaskVideoArgs, rectified?: boolean) {
    let params = new GetTaskRecordFileGpsItemsParams();
    params = Object.assign(params, args);
    params.Rectified = rectified;
    return this.service.server.task.record.file.gps.items(args.TaskId, params);
  }

  file(args: SystemTaskVideoArgs) {
    let params = new GetTaskRecordFileParams();
    params = Object.assign(params, args);
    return this.service.server.task.record.file.mkv(args.TaskId, params);
  }
}
