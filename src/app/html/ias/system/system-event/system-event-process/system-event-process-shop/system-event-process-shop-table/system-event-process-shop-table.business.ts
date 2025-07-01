import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { SystemEventProcessShopTableFilter } from './system-event-process-shop-table.model';

@Injectable()
export class SystemEventProcessShopTableBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(filter: SystemEventProcessShopTableFilter) {
    return this.data(filter);
  }

  private data(filter: SystemEventProcessShopTableFilter) {
    let params = new GetShopRegistrationsParams();
    if (filter.name) {
      params.Name = filter.name;
    }
    if (filter.road) {
      params.RoadIds = [filter.road];
    }
    if (filter.detected != undefined) {
      params.AssociatedCount = filter.detected ? 1 : undefined;
    }
    params.Location = filter.location;
    params.LocationDistance = filter.distance;
    params.Asc = filter.asc;
    params.Desc = filter.desc;
    return this.service.shop.all(params);
  }
}
