import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';

@Injectable()
export class SystemTaskRouteMapPathBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(id: string, rectified?: boolean) {
    return this.service.server.task.gps.items(id, rectified);
  }
}
