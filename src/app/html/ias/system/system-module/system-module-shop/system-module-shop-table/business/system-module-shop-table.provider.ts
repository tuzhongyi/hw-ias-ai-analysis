import { SystemModuleShopTableRoadService } from './service/system-module-shop-table-road.service';
import { SystemModuleShopTableTaskService } from './service/system-module-shop-table-task.service';
import { SystemModuleShopTableService } from './service/system-module-shop-table.service';

import { SystemModuleShopTableBusiness } from './system-module-shop-table.business';
import { SystemModuleShopTableConverter } from './system-module-shop-table.converter';

export const SystemModuleShopTableProviders = [
  SystemModuleShopTableTaskService,
  SystemModuleShopTableRoadService,
  SystemModuleShopTableService,
  SystemModuleShopTableBusiness,
  SystemModuleShopTableConverter,
];
