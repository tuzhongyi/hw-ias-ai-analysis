import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AnalysisTask } from '../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { IConverter } from '../../../../../common/data-core/models/converter.interface';
import { LanguageTool } from '../../../../../common/tools/language.tool';
import { AnalysisTaskRuningModel } from './system-task-table-runing.model';

@Injectable()
export class SystemTaskTableRuningConverter
  implements IConverter<AnalysisTask, AnalysisTaskRuningModel>
{
  constructor(private tool: LanguageTool) {}

  convert(source: AnalysisTask) {
    if (source.StartTime) {
      return this.analysis(source);
    } else {
      return this.upload(source);
    }
  }

  private upload(source: AnalysisTask) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AnalysisTaskRuningModel, plain);
    model.hasdata = true;
    model.StateName = this.tool.TaskState(model.State, '-');
    model.TaskTypeName = this.tool.TaskType(model.TaskType, '-');

    if (source.CreationTime) {
      model.Duration = (Date.now() - source.CreationTime.getTime()) / 1000;

      let duration = (model.Duration ?? 0) * 1000;
      let progress = (model.Progress ?? 0) / 100;
      let estimated = duration / progress;

      model.EstimatedTime = new Date(source.CreationTime.getTime() + estimated);
    }

    return model;
  }
  private analysis(source: AnalysisTask) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AnalysisTaskRuningModel, plain);
    model.hasdata = true;
    model.StateName = this.tool.TaskState(model.State, '-');
    model.TaskTypeName = this.tool.TaskType(model.TaskType, '-');

    if (source.StartTime) {
      model.Duration = (Date.now() - source.StartTime.getTime()) / 1000;

      let duration = (model.Duration ?? 0) * 1000;
      let progress = (model.Progress ?? 0) / 100;
      let estimated = duration / progress;

      let uploadtime =
        source.StartTime.getTime() - source.CreationTime!.getTime();

      model.EstimatedTime = new Date(
        source.StartTime.getTime() + estimated + uploadtime
      );
    }

    return model;
  }
}
