import { SystemModuleShopCompareTableCompareBasedService } from './service/system-module-shop-compare-table-compare-based.service';
import { SystemModuleShopCompareTableCompareRegistrationService } from './service/system-module-shop-compare-table-compare-regisration.service';
import { SystemModuleShopCompareTableCompareService } from './service/system-module-shop-compare-table-compare.service';
import { SystemModuleShopCompareTableTaskService } from './service/system-module-shop-compare-table-task.service';
import { SystemModuleShopCompareTableService } from './service/system-module-shop-compare-table.service';
import { SystemModuleShopCompareTableBusiness } from './system-module-shop-compare-table.business';

export const SystemModuleShopCompareTableProviders = [
  SystemModuleShopCompareTableCompareRegistrationService,
  SystemModuleShopCompareTableCompareBasedService,
  SystemModuleShopCompareTableCompareService,
  SystemModuleShopCompareTableTaskService,
  SystemModuleShopCompareTableService,
  SystemModuleShopCompareTableBusiness,
];
