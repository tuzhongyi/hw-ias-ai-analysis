import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskSampleListParams } from '../../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { SystemEventGspTaskTableFilter } from './system-event-gsp-task-table.model';

@Injectable()
export class SystemEventGspTaskTableBusiness {
  constructor(
    public medium: MediumRequestService,
    private service: ArmAnalysisRequestService
  ) {}

  async load(
    index: number,
    size: number,
    filter: SystemEventGspTaskTableFilter
  ) {
    let data = await this.data.load(index, size, filter);
    if (data.Page.RecordCount == 0 && data.Page.PageIndex > 1) {
      data = await this.data.load(index - 1, size, filter);
    }
    return data;
  }

  private data = {
    load: (
      index: number,
      size: number,
      filter: SystemEventGspTaskTableFilter
    ) => {
      let params = new GetAnalysisGpsTaskSampleListParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.BeginTime = filter.duration.begin;
      params.EndTime = filter.duration.end;
      if (filter.type != undefined) {
        params.TaskType = filter.type;
      }

      params.Asc = filter.asc;
      params.Desc = filter.desc;
      return this.service.llm.gps.task.sample.list(params);
    },
  };
}
