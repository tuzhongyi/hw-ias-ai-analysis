import { BusinessState } from '../../data-core/enums/event/arm-business-state.enum';
import { Shop } from '../../data-core/models/arm/analysis/shop.model';
import { MobileEventRecord } from '../../data-core/models/arm/event/mobile-event-record.model';

export class ConvertEventRecordTool {
  shop(data: MobileEventRecord) {
    let shop = new Shop();
    if (data.Resources && data.Resources.length > 0) {
      let resource = data.Resources[0];
      shop.Name = resource.ResourceName;
      shop.Id = resource.ResourceId;
      shop.RegistrationId = resource.RelationId;
      shop.ImageUrl = resource.ImageUrl;
      shop.BusinessState = BusinessState.Operation;
    }
    shop.BeginTime = data.BeginTime ?? new Date();

    shop.Location = data.Location;
    return shop;
  }
}
