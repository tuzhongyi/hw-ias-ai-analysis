import { Injectable } from '@angular/core';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationTaskDetectedResultParams } from '../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';

@Injectable()
export class SystemTaskFileDetailsMapShopBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(taskId: string, detected?: boolean) {
    let params = new GetShopRegistrationTaskDetectedResultParams();
    params.TaskIds = [taskId];
    params.RouteFilterEnabled = true;
    params.Detected = detected;
    return this.service.shop.task.detected.result.all(params);
  }
}
