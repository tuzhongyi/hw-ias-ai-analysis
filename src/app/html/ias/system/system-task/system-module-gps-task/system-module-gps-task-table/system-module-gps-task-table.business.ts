import { Injectable } from '@angular/core';
import { AnalysisGpsTask } from '../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetAnalysisGpsTaskListParams } from '../../../../../../common/data-core/requests/services/analysis/llm/analysis-llm.params';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { PictureBusiness } from '../../../../share/picture/component/picture.business';
import {
  SystemModuleGpsTaskTableFilter,
  SystemModuleGpsTaskTableItem,
} from './system-module-gps-task-table.model';

@Injectable()
export class SystemModuleGpsTaskTableBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    public picture: PictureBusiness,
    private language: LanguageTool
  ) {}

  async load(
    index: number,
    size: number,
    filter: SystemModuleGpsTaskTableFilter
  ) {
    let data = await this.data.load(index, size, filter);
    if (data.Page.RecordCount == 0 && data.Page.PageIndex > 1) {
      data = await this.data.load(index - 1, size, filter);
    }
    let paged = new PagedList<SystemModuleGpsTaskTableItem>();
    paged.Page = data.Page;
    paged.Data = data.Data.map((x) => this.convert(x));
    return paged;
  }

  private convert(data: AnalysisGpsTask) {
    let model = Object.assign(new SystemModuleGpsTaskTableItem(), data);
    model.TaskTypeName = this.language.local.TaskTypes(data.TaskType);
    return model;
  }

  private data = {
    load: (
      index: number,
      size: number,
      filter: SystemModuleGpsTaskTableFilter
    ) => {
      let params = new GetAnalysisGpsTaskListParams();
      params.PageIndex = index;
      params.PageSize = size;
      params.Asc = filter.asc;
      params.Desc = filter.desc;
      if (filter.name) {
        params.Name = filter.name;
      }
      if (filter.group) {
        params.GroupId = filter.group;
      }
      if (filter.type) {
        params.TaskTypes = [filter.type];
      }
      return this.service.llm.gps.task.list(params);
    },
  };
}
