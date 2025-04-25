import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { Guid } from '../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleShopRegistrationCreationBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private medium: MediumRequestService
  ) {}
  async one() {
    let params = new GetShopRegistrationsParams();
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

  create(data: ShopRegistration) {
    data.Id = Guid.NewGuid().ToString('N').toLowerCase();

    data.CreationTime = new Date();
    data.UpdateTime = new Date();

    return this.service.shop.create(data);
  }

  update(data: ShopRegistration) {
    data.UpdateTime = new Date();
    return this.service.shop.update(data);
  }
}
