import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { SystemTaskResultShopTableFilter } from './system-task-result-shop-table.model';

@Injectable()
export class SystemTaskResultShopTableBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(filter: SystemTaskResultShopTableFilter) {
    let params = new GetShopsParams();
    if (filter.taskId) {
      params.TaskIds = [filter.taskId];
    }
    if (filter.channel) {
      params.CameraNos = [filter.channel];
    }
    if (filter.type) {
      params.ShopTypes = [filter.type];
    }
    if (filter.label != undefined) {
      params.ResultLabelTypes = [filter.label];
    }
    if (filter.confidence) {
      params.Confidence = filter.confidence;
    }
    if (filter.name) {
      params.Name = filter.name;
    }
    return this.service.shop.all(params);
  }
}
