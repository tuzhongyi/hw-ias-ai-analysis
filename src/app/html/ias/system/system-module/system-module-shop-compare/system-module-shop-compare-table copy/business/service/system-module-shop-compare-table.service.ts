import { Injectable } from '@angular/core';
import { SystemModuleShopCompareTableCompareService } from './system-module-shop-compare-table-compare.service';
import { SystemModuleShopCompareTableTaskService } from './system-module-shop-compare-table-task.service';

@Injectable()
export class SystemModuleShopCompareTableService {
  constructor(
    public task: SystemModuleShopCompareTableTaskService,
    public compare: SystemModuleShopCompareTableCompareService
  ) {}
}
