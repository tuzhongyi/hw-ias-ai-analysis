import { SystemModuleShopTableRoadService } from './system-module-shop-table-road.service';
import { SystemModuleShopTableBusiness } from './system-module-shop-table.business';
import { SystemModuleShopTableConverter } from './system-module-shop-table.converter';
import { SystemModuleShopTableService } from './system-module-shop-table.service';

export const SystemModuleShopTableProviders = [
  SystemModuleShopTableRoadService,
  SystemModuleShopTableService,
  SystemModuleShopTableBusiness,
  SystemModuleShopTableConverter,
];
