import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Road } from '../../../../../../common/data-core/models/arm/analysis/road.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';

export class SystemModuleShopRegistrationTableArgs {
  name?: string;
  telphone?: string;
  states: ShopObjectState[] = [];
  road: Road[] = [];
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
