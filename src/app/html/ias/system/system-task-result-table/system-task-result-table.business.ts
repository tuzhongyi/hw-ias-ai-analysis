import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopSignsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { SystemTaskResultTableFilter } from './system-task-result-table.model';

@Injectable()
export class SystemTaskResultTableBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(filter: SystemTaskResultTableFilter) {
    let params = new GetShopSignsParams();
    params.TaskIds = [filter.taskId];
    if (filter.channel) {
      params.CameraNos = [filter.channel];
    }
    if (filter.type) {
      params.SignTypes = [filter.type];
    }

    return this.service.shop.sign.all(params);
  }
}
