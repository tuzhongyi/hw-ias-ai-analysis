import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/road-object/geographic-road-object.params';

export class SystemMainManagerRoadObjectBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load() {
    let params = new GetRoadObjectsParams();
    return this.service.road.object.all(params);
  }
}
