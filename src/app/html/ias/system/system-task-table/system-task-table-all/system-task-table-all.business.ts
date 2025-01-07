import { Injectable } from '@angular/core';
import { PagedList } from '../../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../../common/data-core/requests/services/analysis/analysis.service';
import { SystemTaskTableBusiness } from '../system-task-table.business';
import { SystemTaskTableFilter } from '../system-task-table.model';
import { SystemTaskTableAllConverter } from './system-task-table-all.converter';
import { AnalysisTaskAllModel } from './system-task-table-all.model';

@Injectable()
export class SystemTaskTableAllBusiness extends SystemTaskTableBusiness<AnalysisTaskAllModel> {
  constructor(
    service: ArmAnalysisRequestService,
    converter: SystemTaskTableAllConverter
  ) {
    super(service, converter);
  }

  override load(
    index: number,
    size: number,
    filter: SystemTaskTableFilter
  ): Promise<PagedList<AnalysisTaskAllModel>> {
    filter.finished = undefined;
    return super.load(index, size, filter);
  }
}
