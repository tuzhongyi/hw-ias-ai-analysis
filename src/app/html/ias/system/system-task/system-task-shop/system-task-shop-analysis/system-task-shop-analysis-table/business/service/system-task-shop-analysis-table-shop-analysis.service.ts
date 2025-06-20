import { Injectable } from '@angular/core';
import { Shop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ArmAnalysisRequestService } from '../../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';

@Injectable()
export class SystemTaskShopAnalysisTableShopAnalysisService {
  constructor(private service: ArmAnalysisRequestService) {}

  private datas: Shop[] = [];

  async load(taskId: string) {
    if (this.datas.length > 0) {
      return this.datas;
    }
    let params = new GetShopsParams();
    params.TaskIds = [taskId];
    this.datas = await this.service.shop.all(params);
    return this.datas;
  }
}
