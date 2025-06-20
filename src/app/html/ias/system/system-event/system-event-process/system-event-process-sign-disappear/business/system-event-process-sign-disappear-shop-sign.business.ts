import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopSignsParams } from '../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { LocaleCompare } from '../../../../../../../common/tools/compare-tool/compare.tool';

@Injectable()
export class SystemEventProcessSignDisappearShopSignBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async load(shopId: string, taskId?: string) {
    let datas = await this.data(shopId, taskId);
    return datas.sort((a, b) => {
      return LocaleCompare.compare(a.Confidence, b.Confidence, false);
    });
  }

  private data(shopId: string, taskId?: string) {
    let params = new GetShopSignsParams();
    if (taskId) {
      params.TaskIds = [taskId];
    }
    params.ShopIds = [shopId];
    return this.service.shop.sign.all(params);
  }
}
