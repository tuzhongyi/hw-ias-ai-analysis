import { SystemModuleShopCompareTableCompareService } from './service/system-module-shop-compare-table-compare.service';
import { SystemModuleShopCompareTableTaskService } from './service/system-module-shop-compare-table-task.service';
import { SystemModuleShopCompareTableService } from './service/system-module-shop-compare-table.service';
import { SystemModuleShopCompareTablePagedBusiness } from './system-module-shop-compare-table-paged.business';
import { SystemModuleShopCompareTableBusiness } from './system-module-shop-compare-table.business';

export const SystemModuleShopCompareTableProviders = [
  SystemModuleShopCompareTableCompareService,
  SystemModuleShopCompareTableTaskService,
  SystemModuleShopCompareTableService,
  SystemModuleShopCompareTableBusiness,
  SystemModuleShopCompareTablePagedBusiness,
];
