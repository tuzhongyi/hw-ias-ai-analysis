import { Injectable } from '@angular/core';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ConvertTool } from '../../../../../../../common/tools/convert-tool/convert.tool';

@Injectable()
export class SystemEventManagerShopRegistrationBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  get(id: string) {
    return this.service.shop.get(id);
  }
  create(shop: Shop) {
    let registration = ConvertTool.shop.registration(shop);
    return this.service.shop.create(registration);
  }
}
