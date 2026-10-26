import { Injectable } from '@angular/core';
import { GpsTaskSampleRecord } from '../../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { PagedList } from '../../../../../../common/data-core/models/interface/page-list.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskSampleListParams } from '../../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';
import {
  SystemEventGpsTaskTableFilter,
  SystemEventGpsTaskTableItem,
} from './system-event-gps-task-table.model';

@Injectable()
export class SystemEventTaskTableBusiness {
  constructor(
    public medium: MediumRequestService,
    private service: ArmAnalysisRequestService,
  ) {}

  async load(
    index: number,
    size: number,
    filter: SystemEventGpsTaskTableFilter,
  ) {
    let data = await this.data.load(index, size, filter);
    if (data.Page.RecordCount == 0 && data.Page.PageIndex > 1) {
      data = await this.data.load(index - 1, size, filter);
    }

    let paged = new PagedList<SystemEventGpsTaskTableItem>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.convert(x));
    return paged;
  }

  private convert(data: GpsTaskSampleRecord) {
    let item = ObjectTool.assign(data, SystemEventGpsTaskTableItem);
    item.videoable = item.Resources?.some((x) => x.RecordUrl);
    return item;
  }

  private data = {
    load: (
      index: number,
      size: number,
      filter: SystemEventGpsTaskTableFilter,
    ) => {
      let params = new GetAnalysisGpsTaskSampleListParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.BeginTime = filter.duration.begin;
      params.EndTime = filter.duration.end;
      if (filter.type != undefined) {
        params.TaskType = filter.type;
      }
      if (filter.confirmed != undefined) {
        params.Confirmed = filter.confirmed;
      }
      if (filter.alarm != undefined) {
        params.IsAlarmRecord = filter.alarm;
      }

      params.Asc = filter.asc;
      params.Desc = filter.desc;
      return this.service.llm.gps.task.sample.list(params);
    },
  };
}
