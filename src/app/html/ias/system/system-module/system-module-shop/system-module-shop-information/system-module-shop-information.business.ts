import { Injectable } from '@angular/core';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { Guid } from '../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleShopInformationBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private medium: MediumRequestService
  ) {}
  async one() {
    let params = new GetShopsParams();
    params.PageSize = 1;
    params.PageIndex = 1;
    let paged = await this.service.shop.list(params);
    if (paged && paged.Data && paged.Data.length > 0) {
      return paged.Data[0];
    }
    throw new Error('未找到店铺');
  }

  picture = {
    upload: (data: ArrayBuffer) => {
      return this.medium.upload(data);
    },
  };

  create(data: Shop, sync: boolean) {
    data.Id = Guid.NewGuid().ToString('N').toLowerCase();
    data.IntId = 0;
    data.CreationTime = new Date();
    data.UpdateTime = new Date();
    data.BeginTime = new Date();
    data.EndTime = new Date();

    return this.service.shop.create(data, sync);
  }

  update(data: Shop) {
    data.UpdateTime = new Date();
    return this.service.shop.update(data);
  }
}
