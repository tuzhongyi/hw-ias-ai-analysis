import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadAreaManagerSource {
  usageTypes: EnumNameValue<number>[] = [];

  constructor(private manager: Manager) {
    this.init.usageTypes();
  }

  private init = {
    usageTypes: async () => {
      this.usageTypes =
        await this.manager.source.road.area.RoadAreaUsageTypes.get();
    },
  };
}
