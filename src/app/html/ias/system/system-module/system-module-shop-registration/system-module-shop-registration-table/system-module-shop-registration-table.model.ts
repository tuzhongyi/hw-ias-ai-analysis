import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';

import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';

export class SystemModuleShopRegistrationTableArgs {
  name?: string;
  telphone?: string;
  states: ShopObjectState[] = [];
  road: Road[] = [];

  point?: {
    location: GisPoint;
    distance: number;
  };
}

export class SystemModuleShopRegistrationTableFilter extends SystemModuleShopRegistrationTableArgs {
  asc?: string;
  desc?: string;

  load(args: SystemModuleShopRegistrationTableArgs) {
    return Object.assign(this, args);
  }
}

export class SystemModuleShopRegistrationTableItem extends ShopRegistration {
  ObjectStateName?: string;
  ShopTypeName?: string;
  Image?: string;
}
