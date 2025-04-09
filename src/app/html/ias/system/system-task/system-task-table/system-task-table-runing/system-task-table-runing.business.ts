import { Injectable } from '@angular/core';
import { PagedList } from '../../../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { SystemTaskTableBusiness } from '../system-task-table.business';
import { SystemTaskTableFilter } from '../system-task-table.model';
import { SystemTaskTableRuningConverter } from './system-task-table-runing.converter';
import { AnalysisTaskRuningModel } from './system-task-table-runing.model';

@Injectable()
export class SystemTaskTableRuningBusiness extends SystemTaskTableBusiness<AnalysisTaskRuningModel> {
  constructor(
    service: ArmAnalysisRequestService,
    converter: SystemTaskTableRuningConverter
  ) {
    super(service, converter);
  }

  override load(
    index: number,
    size: number,
    filter: SystemTaskTableFilter
  ): Promise<PagedList<AnalysisTaskRuningModel>> {
    filter.finished = false;
    return super.load(index, size, filter);
  }
}
