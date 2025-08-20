import { SystemMainManagerCardDeviceState } from './system-main-manager-device-state.card';
import { SystemMainManagerCardEventRealtimeStatistic } from './system-main-manager-event-realtime-statistic.card';
import { SystemMainManagerCardEventRealtimeTable } from './system-main-manager-event-realtime-table.card';
import { SystemMainManagerCardEventStatistic } from './system-main-manager-event-statistic.card';
import { SystemMainManagerCardShopStatistic } from './system-main-manager-shop-statistic.card';
import { SystemMainManagerCardTaskStatistic } from './system-main-manager-task-statistic.card';

export class SystemMainManagerCard {
  device = {
    state: new SystemMainManagerCardDeviceState(),
  };
  event = {
    realtime: {
      statistic: new SystemMainManagerCardEventRealtimeStatistic(),
      table: new SystemMainManagerCardEventRealtimeTable(),
    },
    statistic: new SystemMainManagerCardEventStatistic(),
  };

  shop = {
    statistic: new SystemMainManagerCardShopStatistic(),
  };
  task = {
    statistic: new SystemMainManagerCardTaskStatistic(),
  };
}
