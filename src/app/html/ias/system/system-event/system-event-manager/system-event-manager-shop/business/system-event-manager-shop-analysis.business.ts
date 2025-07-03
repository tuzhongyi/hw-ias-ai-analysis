import { Injectable } from '@angular/core';
import { BusinessState } from '../../../../../../../common/data-core/enums/event/arm-business-state.enum';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { MobileEventRecord } from '../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ArmAnalysisRequestService } from '../../../../../../../common/data-core/requests/services/analysis/analysis.service';

@Injectable()
export class SystemEventManagerShopAnalysisBusiness {
  constructor(private service: ArmAnalysisRequestService) {}

  async get(id: string) {
    return this.service.shop.get(id);
  }
  async convert(data: MobileEventRecord) {
    let shop = new Shop();
    if (data.Resources && data.Resources.length > 0) {
      let resource = data.Resources[0];
      shop.Name = resource.ResourceName;
      shop.Id = resource.ResourceId;
      shop.RegistrationId = resource.RelationId;
      shop.ImageUrl = resource.ImageUrl;
      shop.BusinessState = BusinessState.Operation;
    }
    shop.Location = data.Location;
    return shop;
  }
}
