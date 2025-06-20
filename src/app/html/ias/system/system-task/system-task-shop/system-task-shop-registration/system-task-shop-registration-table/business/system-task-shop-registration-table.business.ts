import { Injectable } from '@angular/core';
import { ShopRegistration } from '../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { SystemTaskShopRegistrationTableArgs } from '../system-task-shop-registration-table.model';

@Injectable()
export class SystemTaskShopRegistrationTableBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  count = {
    all: 0,
    associated: 0,
    unassociated: 0,
    clear: () => {
      this.count.all = 0;
      this.count.associated = 0;
      this.count.unassociated = 0;
    },
  };

  async load(args: SystemTaskShopRegistrationTableArgs) {
    let datas = await this.data.load();
    this.count.clear();
    this.count.all = datas.length;
    let results = [];
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      if (item.AssociatedCount) {
        this.count.associated++;
      } else {
        this.count.unassociated++;
      }
      if (this.filter(item, args)) {
        results.push(item);
      }
    }
    return results;
  }

  filter(item: ShopRegistration, args: SystemTaskShopRegistrationTableArgs) {
    let result = true;
    if (args.name) {
      result = item.Name.toLowerCase().includes(args.name.toLowerCase());
    }
    if (args.roadId) {
      result = item.RoadId === args.roadId;
    }
    switch (args.associated) {
      case true:
        result = item.AssociatedCount != undefined && item.AssociatedCount > 0;
        break;
      case false:
        result =
          item.AssociatedCount === undefined || item.AssociatedCount === 0;
        break;
      default:
        break;
    }
    return result;
  }

  private data = {
    load: () => {
      let params = new GetShopRegistrationsParams();
      return this.service.shop.cache.array(params);
    },
  };
}
