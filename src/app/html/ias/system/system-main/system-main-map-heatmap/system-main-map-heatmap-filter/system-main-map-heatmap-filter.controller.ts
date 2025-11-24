import { Injectable } from '@angular/core';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { SystemEventManagerRealtimeSource } from '../../../system-event/system-event-manager/system-event-manager-realtime/system-event-manager-realtime.soiurce';
import { SystemEventManagerShopSource } from '../../../system-event/system-event-manager/system-event-manager-shop/system-event-manager-shop.soiurce';
import { SystemEventTableArgs } from '../../../system-event/system-event-table/business/system-event-table.model';
import { EventMode } from '../../system-main-map-navigation/system-main-map-navigation.model';
import { IHeatmapFilter } from './system-main-map-heatmap-filter.model';

@Injectable()
export class SystemMainMapHeatmapFilterController {
  constructor(
    shop: SystemEventManagerShopSource,
    realtime: SystemEventManagerRealtimeSource,
    private manager: Manager
  ) {
    this.source = { shop, realtime };
  }

  private source: {
    shop: SystemEventManagerShopSource;
    realtime: SystemEventManagerRealtimeSource;
  };
  private args = new SystemEventTableArgs();

  get(mode: EventMode): IHeatmapFilter {
    this.args.type = undefined;
    switch (mode) {
      case EventMode.shop:
        this.source.shop.type.then((x) => {
          this.args.types = x.map((x) => x.Value);
        });

        return {
          source: this.source.shop,
          args: this.args,
        };
      case EventMode.realtime:
        this.source.realtime.type.then((x) => {
          this.args.types = x.map((x) => x.Value);
        });

        return {
          source: this.source.realtime,
          args: this.args,
        };
      case EventMode.gpstask:
        return {
          args: this.args,
        };

      default:
        throw new Error('Mode not supported');
    }
  }
}
