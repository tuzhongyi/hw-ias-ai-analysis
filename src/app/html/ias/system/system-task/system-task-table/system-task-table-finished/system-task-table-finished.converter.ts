import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { IConverter } from '../../../../../../common/data-core/models/converter.interface';
import { LanguageTool } from '../../../../../../common/tools/language.tool';
import { AnalysisTaskFinishModel } from './system-task-table-finished.model';

@Injectable()
export class SystemTaskTableFinishedConverter
  implements IConverter<AnalysisTask, AnalysisTaskFinishModel>
{
  constructor(private tool: LanguageTool) {}

  convert(source: AnalysisTask) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AnalysisTaskFinishModel, plain);
    model.hasdata = true;
    model.StateName = this.tool.TaskState(model.State, '-');
    model.TaskTypeName = this.tool.TaskType(model.TaskType, '-');

    if (source.StartTime) {
      if (source.StopTime) {
        model.Duration =
          (source.StopTime.getTime() - source.StartTime.getTime()) / 1000;
      }
    }

    return model;
  }
}
