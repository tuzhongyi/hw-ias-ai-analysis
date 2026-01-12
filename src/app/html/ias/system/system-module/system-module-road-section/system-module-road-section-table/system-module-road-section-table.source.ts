import { Injectable } from '@angular/core';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadSectionTableSource {
  type = {
    section: new Map<number, string>(),
    event: new Map<number, string>(),
  };

  constructor(private manager: Manager) {
    this.init.section();
    this.init.event();
  }

  private init = {
    section: async () => {
      let types = await this.manager.source.road.section.RoadSectionTypes.get();
      types.forEach((x) => {
        this.type.section.set(x.Value, x.Name);
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
