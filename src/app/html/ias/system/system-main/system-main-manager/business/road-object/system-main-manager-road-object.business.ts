import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectsParams } from '../../../../../../../common/data-core/requests/services/geographic/road/road-object/geographic-road-object.params';
import { SystemMainManagerRoadObjectArgs } from './system-main-manager-road-object.model';

export class SystemMainManagerRoadObjectBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(args: SystemMainManagerRoadObjectArgs) {
    let params = new GetRoadObjectsParams();
    if (args.states) {
      params.ObjectStates = [...args.states];
    }
    return this.service.road.object.all(params);
  }
}
