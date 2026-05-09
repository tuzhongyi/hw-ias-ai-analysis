import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../common/data-core/requests/managers/manager';
import { ArmDivisionRequestService } from '../../../../../common/data-core/requests/services/division/division.service';

@Injectable()
export class SystemStatisticRoadObjectStatementSource {
  object = {
    types: [] as EnumNameValue<number>[],
    states: [] as EnumNameValue<number>[],
  };

  constructor(division: ArmDivisionRequestService, private manager: Manager) {
    this.service = { division };
    this.init.all();
  }

  private service: {
    division: ArmDivisionRequestService;
  };

  division(id: string) {
    return this.service.division.get(id);
  }

  private init = {
    all: () => {
      this.init.road.object.types();
      this.init.road.object.states();
    },
    road: {
      object: {
        types: async () => {
          this.object.types =
            await this.manager.source.road.object.ObjectTypes.get();
        },
        states: async () => {
          this.object.states =
            await this.manager.source.road.object.ObjectStates.get();
        },
      },
    },
  };
}
