import { Injectable } from '@angular/core';
import { SystemModuleShopCompareTableArgs } from '../system-module-shop-compare-table.model';
import { SystemModuleShopCompareTableCompareService } from './system-module-shop-compare-table-compare.service';
import { SystemModuleShopCompareTableTaskService } from './system-module-shop-compare-table-task.service';

@Injectable()
export class SystemModuleShopCompareTableService {
  constructor(
    private task: SystemModuleShopCompareTableTaskService,
    private service: SystemModuleShopCompareTableCompareService
  ) {}

  async load(args: SystemModuleShopCompareTableArgs) {
    let tasks = await this.task.load(args.task);
    let taskIds = tasks.map((task) => task.Id);
    return this.service.compare(taskIds);
  }
}
