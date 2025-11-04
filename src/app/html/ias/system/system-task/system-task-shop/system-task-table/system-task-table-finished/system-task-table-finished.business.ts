import { Injectable } from '@angular/core';
import { PagedList } from '../../../../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { SystemTaskTableBusiness } from '../system-task-table.business';
import {
  AnalysisTaskModel,
  SystemTaskTableFilter,
} from '../system-task-table.model';
import { SystemTaskTableFinishedConverter } from './system-task-table-finished.converter';
import { AnalysisTaskFinishModel } from './system-task-table-finished.model';

@Injectable()
export class SystemTaskTableFinishedBusiness extends SystemTaskTableBusiness<AnalysisTaskFinishModel> {
  constructor(
    service: ArmAnalysisRequestService,
    converter: SystemTaskTableFinishedConverter
  ) {
    super(service, converter);
  }

  override load(
    index: number,
    size: number,
    filter: SystemTaskTableFilter
  ): Promise<PagedList<AnalysisTaskModel>> {
    filter.finished = true;
    return super.load(index, size, filter);
  }
}
