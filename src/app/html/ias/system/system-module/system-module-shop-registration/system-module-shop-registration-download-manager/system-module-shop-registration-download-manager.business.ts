import { Injectable } from '@angular/core';
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadsParams } from '../../../../../../common/data-core/requests/services/geographic/road/geographic-road.params';

@Injectable()
export class SystemModuleShopRegistrationDownloadManagerBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load() {
    let params = new GetRoadsParams();
    return this.service.road.cache.array(params);
  }

  download(road: Road) {
    let link = document.createElement('a');
    link.href = this.service.shop.excel.download(road.Id);
    link.download = `${road.Name}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
