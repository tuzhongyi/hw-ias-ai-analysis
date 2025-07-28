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

  download(road: { on?: Road; ori?: Road }) {
    if (!road.on && !road.ori) return;
    let query = {
      roadId: road.on?.Id,
      oriRoadId: road.ori?.Id,
    };
    let names: string[] = [];
    if (road.on) {
      names.push(road.on.Name);
    }
    if (road.ori) {
      names.push(road.ori.Name);
    }

    let link = document.createElement('a');
    link.href = this.service.shop.excel.download(query);
    link.download = `${names.join('_')}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
