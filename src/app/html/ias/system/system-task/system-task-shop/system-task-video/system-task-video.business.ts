import { Injectable } from '@angular/core';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import {
  GetTaskRecordFileGpsItemsParams,
  GetTaskRecordFileParams,
} from '../../../../../../common/data-core/requests/services/analysis/server/analysis-server.params';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import { SystemTaskVideoArgs } from './system-task-video.model';

@Injectable()
export class SystemTaskVideoBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(
    args: SystemTaskVideoArgs,
    rectified?: boolean,
    precision?: boolean
  ) {
    let datas = await this.data.load(args, rectified);
    let paths = this.convert(datas);

    if (precision == true) {
      paths = paths.filter((group) => {
        return !!group.every((item) => item.HighPrecision);
      });
    } else if (precision == false) {
      paths = paths.filter((group) => {
        return !group.every((item) => item.HighPrecision);
      });
    } else {
    }
    return paths;
  }

  private convert(datas: FileGpsItem[]) {
    if (!Array.isArray(datas) || datas.length === 0) {
      return [];
    }

    let result = ObjectTool.model.FileGpsItem.split(datas);
    return result;
  }

  file(args: SystemTaskVideoArgs) {
    let params = new GetTaskRecordFileParams();
    params = Object.assign(params, args);
    return this.service.server.task.record.file.mkv(args.TaskId, params);
  }

  private data = {
    load: (args: SystemTaskVideoArgs, rectified?: boolean) => {
      let params = new GetTaskRecordFileGpsItemsParams();
      params = Object.assign(params, args);
      params.Rectified = rectified;
      return this.service.server.task.record.file.gps.items(
        args.TaskId,
        params
      );
    },
  };
}
