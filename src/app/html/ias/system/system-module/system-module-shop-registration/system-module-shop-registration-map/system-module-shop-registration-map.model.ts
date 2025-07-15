import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';

export class SystemModuleShopRegistrationMapArgs {
  name?: string;
  road?: {
    on?: Road;
    ori?: Road;
  };
}
