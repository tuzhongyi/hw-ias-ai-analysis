import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopStatisticStatus } from '../../../system-task-route/system-task-route-statistic/system-task-route-statistic.model';
import {
  ISystemTaskShopAnalysisTableItem,
  SystemTaskShopAnalysisTableArgs,
} from '../system-task-shop-analysis-table.model';
import { SystemTaskShopAnalysisTableShopService } from './service/system-task-shop-analysis-table-shop.service';

@Injectable()
export class SystemTaskShopAnalysisTableBusiness {
  constructor(private service: SystemTaskShopAnalysisTableShopService) {}

  count = {
    all: 0,
    detected: 0,
    discover: 0,
    misinfo: 0,
    clear: () => {
      this.count.all = 0;
      this.count.detected = 0;
      this.count.discover = 0;
      this.count.misinfo = 0;
    },
  };

  async load(args: SystemTaskShopAnalysisTableArgs) {
    let registrations = await this.service.registration.load();
    let shops = await this.service.analysis.load(args.taskId);
    this.count.clear();
    this.count.all = shops.length;
    let datas: ISystemTaskShopAnalysisTableItem[] = [];
    for (let i = 0; i < shops.length; i++) {
      let shop = shops[i];
      if (shop.Marking) {
        this.count.misinfo++;
      } else if (shop.RegistrationId) {
        this.count.detected++;
      } else if (shop.ObjectState === ShopObjectState.Created) {
        this.count.discover++;
      }
      let item: ISystemTaskShopAnalysisTableItem = {
        shop: shop,
        registration: registrations.find((x) => x.Id === shop.RegistrationId),
      };
      datas.push(item);
    }
    datas = this.filter(datas, args);
    return datas;
  }

  private filter(
    datas: ISystemTaskShopAnalysisTableItem[],
    args: SystemTaskShopAnalysisTableArgs
  ) {
    switch (args.status) {
      case ShopStatisticStatus.detected:
        datas = datas.filter((x) => x.shop.RegistrationId);
        break;
      case ShopStatisticStatus.discover:
        datas = datas.filter(
          (x) =>
            x.shop.ObjectState === ShopObjectState.Created &&
            !x.shop.RegistrationId
        );
        break;
      case ShopStatisticStatus.misinfo:
        datas = datas.filter((x) => x.shop.Marking);
        break;
      default:
        break;
    }
    if (args.road.on) {
      datas = datas.filter((x) => x.shop.RoadId === args.road.on);
    }
    if (args.road.ori) {
      datas = datas.filter((x) => x.shop.OriRoadId === args.road.ori);
    }
    if (args.name) {
      datas = datas.filter((x) => {
        return (x.shop.Name ?? '')
          .toLocaleLowerCase()
          .includes((args.name ?? '').toLocaleLowerCase());
      });
    }
    return datas;
  }
}
