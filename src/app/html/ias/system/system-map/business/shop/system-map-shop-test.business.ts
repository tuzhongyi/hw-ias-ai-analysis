import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemMapShopTestBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async load(args: any, distance: any) {
    return this.service.shop.all();
  }
}
