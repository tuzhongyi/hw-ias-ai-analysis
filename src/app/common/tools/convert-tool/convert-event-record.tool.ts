import { ShopObjectState } from '../../data-core/enums/analysis/shop-object-state.enum';
import { BusinessState } from '../../data-core/enums/event/arm-business-state.enum';
import { ShopRegistration } from '../../data-core/models/arm/analysis/shop-registration.model';
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
  registration(data: MobileEventRecord) {
    if (data.Resources && data.Resources.length > 0) {
      let resource = data.Resources[0];
      let shop = new ShopRegistration();
      shop.Name = resource.ResourceName;
      shop.Location = data.Location;
      shop.ObjectState = ShopObjectState.Created;
      shop.ShopType = 1;
      shop.BusinessState = 2;
      shop.ImageUrl = resource.ImageUrl;
      return shop;
    }
    return undefined;
  }
}
