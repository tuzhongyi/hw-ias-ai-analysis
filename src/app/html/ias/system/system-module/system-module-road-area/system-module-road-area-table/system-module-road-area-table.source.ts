import { Injectable } from '@angular/core';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadAreaTableSource {
  type = {
    usage: new Map<number, string>(),
    event: new Map<number, string>(),
  };

  constructor(private manager: Manager) {
    this.init.usage();
    this.init.event();
  }

  private init = {
    usage: async () => {
      let types = await this.manager.source.road.area.RoadAreaUsageTypes.get();
      types.forEach((x) => {
        this.type.usage.set(x.Value, x.Name);
      });
    },
    event: async () => {
      let types = await this.manager.source.event.EventTypes.get();
      types.forEach((x) => {
        this.type.event.set(x.Value, x.Name);
      });
    },
  };
}
