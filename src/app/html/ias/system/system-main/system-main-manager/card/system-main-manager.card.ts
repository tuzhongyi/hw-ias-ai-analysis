import { SystemMainManagerComponent } from '../system-main-manager.component';
import { SystemMainManagerWindow } from '../window/system-main-manager.window';
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
    this.device = this.init.device(that.window);
    this.shop = this.init.shop(that.window);
    this.realtime = this.init.realtime(that.window);
    this.gpstask = this.init.gpstask(that.window);
  }

  private init = {
    statistic: (that: SystemMainManagerComponent) => {
      return {
        number: new SystemMainManagerCardStatisticNumber(that.window),
        table: new SystemMainManagerCardEventTable(that),
        pie: new SystemMainManagerCardEventStatisticPie(that.window),
      };
    },
    device: (window: SystemMainManagerWindow) => {
      return {
        state: new SystemMainManagerCardDeviceState(),
        route: new SystemMainManagerCardDeviceRoute(),
      };
    },
    shop: (window: SystemMainManagerWindow) => {
      return {
        statistic: new SystemMainManagerCardShopStatistic(),
        task: new SystemMainManagerCardShopTask(),
        table: new SystemMainManagerCardShopTable(),
        pie: new SystemMainManagerCardShopStatisticPie(),
        line: new SystemMainManagerCardShopStatisticLine(),
      };
    },
    realtime: (window: SystemMainManagerWindow) => {
      return {
        pie: new SystemMainManagerCardRealtimeStatistic(window),
        line: new SystemMainManagerCardRealtimeLine(),
        table: new SystemMainManagerCardRealtimeTable(),
      };
    },
    gpstask: (window: SystemMainManagerWindow) => {
      return {
        line: new SystemMainManagerCardSampleLine(),
      };
    },
  };
}
