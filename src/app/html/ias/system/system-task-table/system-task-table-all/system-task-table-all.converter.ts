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

    return model;
  }

  private estimated = {
    upload: (model: AnalysisTaskAllModel, creation: Date) => {
      let duration = model.UploadDuration() * 1000;
      let progress = (model.Progress ?? 0) / 100;
      let estimated = duration / progress;
      return new Date(creation.getTime() + estimated);
    },

    analysis: (model: AnalysisTaskAllModel, creation: Date, start: Date) => {
      let duration = model.AnalysisDuration() * 1000;
      let progress = (model.Progress ?? 0) / 100;
      let estimated = duration / progress;

      let uploadtime = start.getTime() - creation.getTime();

      return new Date(start.getTime() + estimated + uploadtime);
    },
  };
}
