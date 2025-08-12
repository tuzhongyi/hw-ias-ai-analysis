import { SystemMainManagerDeviceStateCard } from './system-main-manager-device-state.card';
import { SystemMainManagerEventRealtimeStatisticCard } from './system-main-manager-event-realtime-statistic.card';
import { SystemMainManagerEventRealtimeTableCard } from './system-main-manager-event-realtime-table.card';
import { SystemMainManagerEventStatisticCard } from './system-main-manager-event-statistic.card';
import { SystemMainManagerShopStatisticCard } from './system-main-manager-shop-statistic.card';
import { SystemMainManagerTaskStatisticCard } from './system-main-manager-task-statistic.card';

export class SystemMainManagerCard {
  device = {
    state: new SystemMainManagerDeviceStateCard(),
  };
  event = {
    realtime: {
      statistic: new SystemMainManagerEventRealtimeStatisticCard(),
      table: new SystemMainManagerEventRealtimeTableCard(),
    },
    statistic: new SystemMainManagerEventStatisticCard(),
  };

  shop = {
    statistic: new SystemMainManagerShopStatisticCard(),
  };
  task = {
    statistic: new SystemMainManagerTaskStatisticCard(),
  };
}
