import { SystemMainManagerWindow } from '../window/system-main-manager.window';
import { SystemMainManagerCardDeviceState } from './system-main-manager-device-state.card';
import { SystemMainManagerCardEventRealtimeStatistic } from './system-main-manager-event-realtime-statistic.card';
import { SystemMainManagerCardEventRealtimeTable } from './system-main-manager-event-realtime-table.card';
import { SystemMainManagerCardEventStatistic } from './system-main-manager-event-statistic.card';
import { SystemMainManagerCardShopStatistic } from './system-main-manager-shop-statistic.card';
import { SystemMainManagerCardTaskStatistic } from './system-main-manager-task-statistic.card';

export class SystemMainManagerCard {
  task: {
    statistic: SystemMainManagerCardTaskStatistic;
  };

  event: {
    realtime: {
      statistic: SystemMainManagerCardEventRealtimeStatistic;
      table: SystemMainManagerCardEventRealtimeTable;
    };
    statistic: SystemMainManagerCardEventStatistic;
  };
  constructor(private window: SystemMainManagerWindow) {
    this.task = {
      statistic: new SystemMainManagerCardTaskStatistic(),
    };
    this.event = {
      realtime: {
        statistic: new SystemMainManagerCardEventRealtimeStatistic(this.window),
        table: new SystemMainManagerCardEventRealtimeTable(),
      },
      statistic: new SystemMainManagerCardEventStatistic(this.window),
    };
  }

  device = {
    state: new SystemMainManagerCardDeviceState(),
  };

  shop = {
    statistic: new SystemMainManagerCardShopStatistic(),
  };
}
