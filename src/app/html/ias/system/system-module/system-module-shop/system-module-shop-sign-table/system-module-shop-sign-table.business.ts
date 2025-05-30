import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopSignsParams } from '../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { ShopSignConverter } from '../../../../../../common/view-models/shop-sign/shop-sign.converter';

@Injectable()
export class SystemModuleShopSignTableBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private medium: MediumRequestService,
    private converter: ShopSignConverter
  ) {}

  async load(id: string, taskId?: string) {
    let datas = await this.data(id, taskId);
    return datas.map((data) => this.converter.convert(data));
  }

  private data(id: string, taskId?: string) {
    let params = new GetShopSignsParams();
    params.ShopIds = [id];
    if (taskId) {
      params.TaskIds = [taskId];
    }
    return this.service.shop.sign.all(params);
  }

  picture(id: string) {
    return this.medium.picture(id);
  }
}
