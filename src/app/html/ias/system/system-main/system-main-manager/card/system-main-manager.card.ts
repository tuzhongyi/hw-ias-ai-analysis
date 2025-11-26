import { SystemMainManagerComponent } from '../system-main-manager.component';
import { SystemMainManagerCardDeviceRoute } from './device/system-main-manager-device-route.card';
import { SystemMainManagerCardDeviceState } from './device/system-main-manager-device-state.card';
import { SystemMainManagerCardSampleLine } from './gpstask/system-main-manager-sample-line.card';
import { SystemMainManagerCardRealtimeLine } from './realtime/system-main-manager-realtime-line.card';
import { SystemMainManagerCardRealtimeStatistic } from './realtime/system-main-manager-realtime-statistic.card';
import { SystemMainManagerCardRealtimeTable } from './realtime/system-main-manager-realtime-table.card';
import { SystemMainManagerCardShopStatisticLine } from './shop/system-main-manager-shop-statistic-line.card';
import { SystemMainManagerCardShopStatisticPie } from './shop/system-main-manager-shop-statistic-pie.card';
import { SystemMainManagerCardShopStatistic } from './shop/system-main-manager-shop-statistic.card';
import { SystemMainManagerCardShopTable } from './shop/system-main-manager-shop-table.card';
import { SystemMainManagerCardShopTask } from './shop/system-main-manager-shop-task.card';
import { SystemMainManagerCardEventStatisticPie } from './system-main-manager-event-statistic-pie.card';
import { SystemMainManagerCardEventTable } from './system-main-manager-event-table.card';
import { SystemMainManagerCardStatisticNumber } from './system-main-manager-statistic-number.card';

export class SystemMainManagerCard {
  statistic: {
    number: SystemMainManagerCardStatisticNumber;
    table: SystemMainManagerCardEventTable;
    pie: SystemMainManagerCardEventStatisticPie;
  };
  device: {
    state: SystemMainManagerCardDeviceState;
    route: SystemMainManagerCardDeviceRoute;
  };
  shop: {
    statistic: SystemMainManagerCardShopStatistic;
    task: SystemMainManagerCardShopTask;
    table: SystemMainManagerCardShopTable;
    pie: SystemMainManagerCardShopStatisticPie;
    line: SystemMainManagerCardShopStatisticLine;
  };

  realtime: {
    pie: SystemMainManagerCardRealtimeStatistic;
    line: SystemMainManagerCardRealtimeLine;
    table: SystemMainManagerCardRealtimeTable;
  };
  gpstask: {
    line: SystemMainManagerCardSampleLine;
  };
  constructor(that: SystemMainManagerComponent) {
    this.statistic = this.init.statistic(that);
    this.device = this.init.device(that);
    this.shop = this.init.shop(that);
    this.realtime = this.init.realtime(that);
    this.gpstask = this.init.gpstask(that);
  }

  private init = {
    statistic: (that: SystemMainManagerComponent) => {
      return {
        number: new SystemMainManagerCardStatisticNumber(that),
        table: new SystemMainManagerCardEventTable(that),
        pie: new SystemMainManagerCardEventStatisticPie(that),
      };
    },
    device: (that: SystemMainManagerComponent) => {
      return {
        state: new SystemMainManagerCardDeviceState(),
        route: new SystemMainManagerCardDeviceRoute(),
      };
    },
    shop: (that: SystemMainManagerComponent) => {
      return {
        statistic: new SystemMainManagerCardShopStatistic(),
        task: new SystemMainManagerCardShopTask(),
        table: new SystemMainManagerCardShopTable(),
        pie: new SystemMainManagerCardShopStatisticPie(that),
        line: new SystemMainManagerCardShopStatisticLine(),
      };
    },
    realtime: (that: SystemMainManagerComponent) => {
      return {
        pie: new SystemMainManagerCardRealtimeStatistic(that),
        line: new SystemMainManagerCardRealtimeLine(),
        table: new SystemMainManagerCardRealtimeTable(),
      };
    },
    gpstask: (that: SystemMainManagerComponent) => {
      return {
        line: new SystemMainManagerCardSampleLine(),
      };
    },
  };
}
