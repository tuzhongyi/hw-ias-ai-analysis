import { Injectable } from '@angular/core';
import { SystemModuleShopCompareTableCompareBasedService } from './system-module-shop-compare-table-compare-based.service';
import { SystemModuleShopCompareTableCompareRegistrationService } from './system-module-shop-compare-table-compare-regisration.service';

@Injectable()
export class SystemModuleShopCompareTableCompareService {
  constructor(
    public registration: SystemModuleShopCompareTableCompareRegistrationService,
    public based: SystemModuleShopCompareTableCompareBasedService
  ) {}
}
