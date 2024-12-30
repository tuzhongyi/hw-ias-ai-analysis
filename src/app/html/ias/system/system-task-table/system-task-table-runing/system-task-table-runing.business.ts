import { Injectable } from '@angular/core';
import { PagedList } from '../../../../../common/data-core/models/page-list.model';
import { ArmAnalysisRequestService } from '../../../../../common/data-core/requests/services/analysis/analysis.service';
import { SystemTaskTableBusiness } from '../system-task-table.business';
import {
  AnalysisTaskModel,
  SystemTaskTableFilter,
} from '../system-task-table.model';
import { SystemTaskTableRuningConverter } from './system-task-table-runing.converter';

@Injectable()
export class SystemTaskTableRuningBusiness extends SystemTaskTableBusiness {
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
  ): Promise<PagedList<AnalysisTaskModel>> {
    filter.finished = false;
    return super.load(index, size, filter);
  }
}
