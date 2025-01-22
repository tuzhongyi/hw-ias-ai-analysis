import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopSignsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { ShopSignConverter } from '../../../../common/view-models/shop-sign/shop-sign.converter';
import { SystemTaskResultSignTableFilter } from './system-task-result-sign-table.model';

@Injectable()
export class SystemTaskResultSignTableBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private converter: ShopSignConverter
  ) {}

  async load(filter: SystemTaskResultSignTableFilter) {
    let datas = await this.data(filter);
    return datas.map((data) => this.converter.convert(data));
  }
  private data(filter: SystemTaskResultSignTableFilter) {
    let params = new GetShopSignsParams();
    params.TaskIds = [filter.taskId];
    if (filter.shopId) {
      params.ShopIds = [filter.shopId];
    }
    if (filter.channel) {
      params.CameraNos = [filter.channel];
    }
    if (filter.type) {
      params.SignTypes = [filter.type];
    }
    if (filter.label != undefined) {
      params.ResultLabelTypes = [filter.label];
    }
    if (filter.confidence) {
      params.Confidence = filter.confidence;
    }

    return this.service.shop.sign.all(params);
  }
}
