import { Injectable } from '@angular/core';
import { SystemTaskShopAnalysisTableShopAnalysisService } from './system-task-shop-analysis-table-shop-analysis.service';
import { SystemTaskShopAnalysisTableShopRegistrationService } from './system-task-shop-analysis-table-shop-registration.service';

@Injectable()
export class SystemTaskShopAnalysisTableShopService {
  constructor(
    public registration: SystemTaskShopAnalysisTableShopRegistrationService,
    public analysis: SystemTaskShopAnalysisTableShopAnalysisService
  ) {}
}
