import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AnalysisTask } from '../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { IConverter } from '../../../../../common/data-core/models/converter.interface';
import { LanguageTool } from '../../../../../common/tools/language.tool';
import { AnalysisTaskAllModel } from './system-task-table-all.model';

@Injectable()
export class SystemTaskTableAllConverter
  implements IConverter<AnalysisTask, AnalysisTaskAllModel>
{
  constructor(private tool: LanguageTool) {}

  convert(source: AnalysisTask) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AnalysisTaskAllModel, plain);
    model.hasdata = true;
    model.StateName = this.tool.TaskState(model.State, '-');
    model.TaskTypeName = this.tool.TaskType(model.TaskType, '-');
    model.UploadDuration.set(this.duration.upload(model));
    model.AnalysisDuration.set(this.duration.analysis(model));
    return model;
  }

  duration = {
    upload: (data: AnalysisTaskAllModel) => {
      let value = 0;
      if (data.CreationTime) {
        value = (Date.now() - data.CreationTime.getTime()) / 1000;
      }
      return value;
    },
    analysis: (data: AnalysisTaskAllModel) => {
      let value = 0;
      if (data.StartTime) {
        if (data.StopTime) {
          value = (data.StopTime.getTime() - data.StartTime.getTime()) / 1000;
        } else {
          value = (Date.now() - data.StartTime.getTime()) / 1000;
        }
      }
      return value;
    },
  };
}
