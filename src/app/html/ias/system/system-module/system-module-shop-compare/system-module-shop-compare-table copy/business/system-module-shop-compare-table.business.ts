import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { SystemModuleShopCompareTableService } from './service/system-module-shop-compare-table.service';
import {
  SystemModuleShopCompareTableArgs,
  SystemModuleShopCompareTableResult,
} from './system-module-shop-compare-table.model';

@Injectable()
export class SystemModuleShopCompareTableBusiness {
  constructor(private service: SystemModuleShopCompareTableService) {}

  count = new SystemModuleShopCompareTableResult();

  async based(args: SystemModuleShopCompareTableArgs) {
    let tasks = await this.service.task.load(args.taskcount);
    let taskIds = tasks.map((task) => task.Id);
    let datas = await this.service.compare.based.compare(
      taskIds,
      args.comparecount
    );
    this.count.task = this.service.task.count;
    this.count.shop = { ...this.service.compare.based.count };
    return datas;
  }
  async registration(args: SystemModuleShopCompareTableArgs) {
    let tasks = await this.service.task.load(args.taskcount);
    let taskIds = tasks.map((task) => task.Id);
    let datas = await this.service.compare.registration.compare(taskIds);
    this.count.task = this.service.task.count;
    this.count.shop.created = 0;
    this.count.shop.disappeared = 0;
    this.count.shop.existed = 0;
    datas.forEach((x) => {
      switch (x.ObjectState) {
        case ShopObjectState.Created:
          this.count.shop.created++;
          break;
        case ShopObjectState.Disappeared:
          this.count.shop.disappeared++;
          break;
        case ShopObjectState.Existed:
          this.count.shop.existed++;
          break;
        default:
          break;
      }
    });
    return datas;
  }
}
