import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { Guid } from '../../../../../../../common/tools/guid/guid';

@Injectable()
export class SystemModuleShopRegistrationInformationBusiness {
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

  road = {
    get: (id: string) => {
      return this.service.road.get(id);
    },
    all: () => {
      return this.service.road.all();
    },
  };

  picture = {
    upload: (data: ArrayBuffer) => {
      return this.medium.upload(data);
    },
    download: (id: string) => {
      return this.medium.download(id);
    },
    get: (id: string) => {
      return this.medium.picture(id);
    },
    convert: (data: ArrayBuffer) => {
      var binary = '';
      var bytes = new Uint8Array(data);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return `data:image/png;base64,${window.btoa(binary)}`;
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
