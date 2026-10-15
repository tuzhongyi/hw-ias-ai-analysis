import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/interface/model.interface';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadAreaDetailsInfoSource {
  usageTypes: EnumNameValue<number>[] = [];
  events: IIdNameModel<number>[] = [];

  constructor(private manager: Manager) {
    this.init.usageTypes();
    this.init.events();
  }

  private init = {
    usageTypes: async () => {
      this.usageTypes =
        await this.manager.source.road.area.RoadAreaUsageTypes.get();
    },
    events: async () => {
      let events = await this.manager.source.event.EventTypes.get();
      this.events = events.map((x) => ({
        Id: x.Value,
        Name: x.Name,
      }));
    },
  };
}
