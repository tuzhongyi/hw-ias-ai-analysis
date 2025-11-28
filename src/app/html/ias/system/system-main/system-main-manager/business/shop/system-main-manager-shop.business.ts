import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ArmGeographicRequestService } from '../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetShopRegistrationsParams } from '../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { SystemMainManagerShopArgs } from '../system-main-manager.model';

export class SystemMainManagerShopBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  load(args: SystemMainManagerShopArgs) {
    let params = new GetShopRegistrationsParams();
    params.Name = args.name;
    if (args.road.on) {
      params.RoadIds = [args.road.on.Id];
    }
    if (args.road.ori) {
      params.OriRoadIds = [args.road.ori.Id];
    }
    if (args.states && args.states.length > 0) {
      params.ObjectStates = [...args.states];
    }
    return this.service.shop.all(params).then((datas) => {
      datas.forEach((x) => {
        if (x.Removal) {
          x.ObjectState = ShopObjectState.Disappeared;
        } else if (x.AssociatedCount) {
          x.ObjectState = ShopObjectState.Existed;
        } else {
          x.ObjectState = ShopObjectState.Created;
        }
      });
      return datas;
    });
  }
}
