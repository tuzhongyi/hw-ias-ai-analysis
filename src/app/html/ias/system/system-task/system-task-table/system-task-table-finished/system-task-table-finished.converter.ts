import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { IConverter } from '../../../../../../common/data-core/models/converter.interface';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { AnalysisTaskFinishModel } from './system-task-table-finished.model';

@Injectable()
export class SystemTaskTableFinishedConverter
  implements IConverter<AnalysisTask, AnalysisTaskFinishModel>
{
  constructor(
    private tool: LanguageTool,
    private service: ArmAnalysisRequestService
  ) {}

  convert(source: AnalysisTask) {
    let plain = instanceToPlain(source);
    let model = plainToInstance(AnalysisTaskFinishModel, plain);
    model.hasdata = true;
    model.StateName = this.tool.analysis.server.TaskState(model.State, '-');
    model.TaskTypeName = this.tool.analysis.server.TaskType(
      model.TaskType,
      '-'
    );

    if (source.StartTime) {
      if (source.StopTime) {
        model.Duration =
          (source.StopTime.getTime() - source.StartTime.getTime()) / 1000;
      }
    }

    model.ShopCount = this.shop(source.Id).then((x) => {
      return x.Page.TotalRecordCount;
    });

    return model;
  }

  shop(taskId: string) {
    let params = new GetShopsParams();
    params.TaskIds = [taskId];
    return this.service.shop.list(params);
  }
}
