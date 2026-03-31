import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadPointManagerSource {
  pointtypes: EnumNameValue<number>[] = [];

  constructor(private manager: Manager) {
    this.init.pointtypes();
  }

  private init = {
    pointtypes: async () => {
      this.pointtypes =
        await this.manager.source.road.point.RoadPointTypes.get();
    },
  };
}
