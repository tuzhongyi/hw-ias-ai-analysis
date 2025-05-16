import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../../../common/data-core/requests/services/analysis/analysis.service';

@Injectable()
export class SystemEventHandleBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  shop = {
    get: (id: string) => {
      return this.service.shop.get(id);
    },
  };
}
