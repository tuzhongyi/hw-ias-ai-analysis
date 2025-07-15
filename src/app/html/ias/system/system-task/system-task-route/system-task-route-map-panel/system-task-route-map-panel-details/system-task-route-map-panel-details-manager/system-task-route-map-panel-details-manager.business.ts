import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';

@Injectable()
export class SystemTaskRouteMapPanelDetailsManagerBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  load(taskId: string, registrationId: string) {
    let params = new GetShopsParams();
    params.TaskIds = [taskId];
    params.RegistrationIds = [registrationId];
    return this.service.shop.all(params);
  }
}
