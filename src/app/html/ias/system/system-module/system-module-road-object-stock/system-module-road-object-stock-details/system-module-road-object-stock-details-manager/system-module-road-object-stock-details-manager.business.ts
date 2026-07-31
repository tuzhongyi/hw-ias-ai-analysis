import { Injectable } from '@angular/core';
import { RoadObjectStock } from '../../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';

@Injectable()
export class SystemModuleRoadObjectStockDetailsManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  create(data: RoadObjectStock, image: ArrayBuffer) {
    data.Id = '';
    data.UpdateTime = new Date();
    data.CreationTime = new Date();
    return this.service.road.object.stock.create(data, image);
  }

  update(data: RoadObjectStock) {
    data.UpdateTime = new Date();
    return this.service.road.object.stock.update(data);
  }
}
