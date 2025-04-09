import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { IConverter } from '../../../../../../common/data-core/models/converter.interface';
import { LanguageTool } from '../../../../../../common/tools/language.tool';
import { AnalysisTaskRuningModel } from './system-task-table-runing.model';

@Injectable()
export class SystemTaskTableRuningConverter
  implements IConverter<AnalysisTask, AnalysisTaskRuningModel>
{
  constructor(private tool: LanguageTool) {}

  convert(source: AnalysisTask) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AnalysisTaskRuningModel, plain);
    model.hasdata = true;
    model.StateName = this.tool.TaskState(model.State, '-');
    model.TaskTypeName = this.tool.TaskType(model.TaskType, '-');
    model.UploadDuration.set(this.duration.upload(model));
    model.AnalysisDuration.set(this.duration.analysis(model));
    if (source.State != undefined && source.State > 0) {
      if (source.State > 0 && source.CreationTime) {
        if (source.StartTime) {
          model.EstimatedTime = this.estimated.analysis(
            model,
            source.CreationTime,
            source.StartTime
          );
        } else {
          model.EstimatedTime = this.estimated.upload(
            model,
            source.CreationTime
          );
        }
      }
    }
    return model;
  }

  private estimated = {
    upload: (model: AnalysisTaskRuningModel, creation: Date) => {
      let duration = model.UploadDuration() * 1000;
      if (model.Progress) {
        let progress = model.Progress / 100;
        let estimated = duration / progress;
        let date = new Date(creation.getTime() + estimated);
        return date;
      }
      return undefined;
    },

    analysis: (model: AnalysisTaskRuningModel, creation: Date, start: Date) => {
      let duration = model.AnalysisDuration() * 1000;
      if (model.Progress) {
        let progress = model.Progress / 100;
        let estimated = duration / progress;
        let uploadtime = start.getTime() - creation.getTime();
        let date = new Date(start.getTime() + estimated + uploadtime);
        return date;
      }
      return undefined;
    },
  };
  duration = {
    upload: (data: AnalysisTaskRuningModel) => {
      let value = 0;
      if (data.CreationTime) {
        value = (Date.now() - data.CreationTime.getTime()) / 1000;
      }
      return value;
    },
    analysis: (data: AnalysisTaskRuningModel) => {
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
