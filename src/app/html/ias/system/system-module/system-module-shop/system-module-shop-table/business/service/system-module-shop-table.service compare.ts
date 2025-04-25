import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopTaskCompareResult } from '../../../../../../../../common/data-core/models/arm/analysis/shop-task-compare-result.model';
import { IShop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { PagedList } from '../../../../../../../../common/data-core/models/page-list.model';
import { ArmGeographicRequestService } from '../../../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { ShopTaskCompareParams } from '../../../../../../../../common/data-core/requests/services/geographic/shop/geographic-shop.params';
import { SystemModuleShopTableFilter } from '../../system-module-shop-table.model';
import { SystemModuleShopTableTaskService } from './system-module-shop-table-task.service';

@Injectable()
export class SystemModuleShopTableService {
  constructor(
    private task: SystemModuleShopTableTaskService,
    private geo: ArmGeographicRequestService
  ) {}

  data = {
    compare: [] as ShopTaskCompareResult[],
    shop: [] as IShop[],
  };

  async load(index: number, size: number, args: SystemModuleShopTableFilter) {
    if (this.data.compare.length === 0) {
      this.data.compare = await this.compare(args);
      this.data.shop = this.classify(this.data.compare);
    }
    let filted = this.filter(args, [...this.data.shop]);
    let paged = PagedList.create<IShop>(filted, index, size);
    return paged;
  }

  private classify(datas: ShopTaskCompareResult[]) {
    let result: IShop[] = [];
    for (let i = 0; i < datas.length; i++) {
      let item = datas[i];
      switch (item.ObjectState) {
        case ShopObjectState.Disappeared:
          if (item.ShopRegistration) {
            result.push(item.ShopRegistration);
          }
          break;
        case ShopObjectState.Created:
          if (item.Shop) {
            result.push(item.Shop);
          }
          break;
        case ShopObjectState.Existed:
          if (item.Shop) {
            result.push(item.Shop);
          } else if (item.ShopRegistration) {
            result.push(item.ShopRegistration);
          } else {
          }
          break;
        default:
          break;
      }
    }
    return result;
  }

  filter(args: SystemModuleShopTableFilter, datas: IShop[]) {
    if (args.states.length > 0) {
      datas = datas.filter((x) => {
        return args.states.includes(x.ObjectState);
      });
    }
    if (args.name) {
      datas = datas.filter((x) => {
        return x.Name.includes(args.name!);
      });
    }
    if (args.type) {
      datas = datas.filter((x) => {
        return x.ShopType === args.type;
      });
    }
    return datas;
  }

  private async compare(args: SystemModuleShopTableFilter) {
    let tasks = await this.task.load(args);
    let taskIds = tasks.map((x) => x.Id);
    let params = new ShopTaskCompareParams();
    params.TaskIds = taskIds;
    return this.geo.shop.task.compare(params);
  }
}
