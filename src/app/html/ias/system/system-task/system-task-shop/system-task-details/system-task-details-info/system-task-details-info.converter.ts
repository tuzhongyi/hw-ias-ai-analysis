import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { SystemTaskDetailsFileModel } from '../system-task-details-file-table/system-task-details-file-table.model';
import { SystemTaskDetailsInfo } from './system-task-details-info.model';

@Injectable()
export class SystemTaskDetailsInfoConverter {
  constructor(private language: LanguageTool) {}
  convert(source: AnalysisTask) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(SystemTaskDetailsInfo, plain);
    model.TaskTypeName = this.language.analysis.server.TaskType(
      model.TaskType,
      '-'
    );
    model.StateName = this.language.analysis.server.TaskState(model.State, '-');

    return model;
  }

  file(name: string) {
    let info = new SystemTaskDetailsFileModel();
    info.filename = name;
    return info;
  }
}
