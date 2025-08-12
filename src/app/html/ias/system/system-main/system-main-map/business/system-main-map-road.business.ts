import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';

export class SystemMainMapRoadBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load() {
    return this.service.road.all();
  }
}
