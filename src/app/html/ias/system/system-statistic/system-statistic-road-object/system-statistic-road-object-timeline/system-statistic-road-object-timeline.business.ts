import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { Duration } from '../../../../../../common/tools/date-time-tool/duration.model';

@Injectable()
export class SystemStatisticRoadObjectTimelineBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(duration: Duration) {}

  private data = {
    load: () => {},
  };
}
