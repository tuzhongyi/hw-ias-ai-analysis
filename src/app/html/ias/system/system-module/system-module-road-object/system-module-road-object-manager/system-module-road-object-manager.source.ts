import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadObjectManagerSource {
  types: EnumNameValue<number>[] = [];
  states: EnumNameValue<number>[] = [];

  constructor(private manager: Manager) {
    this.init.types();
    this.init.states();
  }

  private init = {
    types: async () => {
      this.types = await this.manager.source.road.object.ObjectTypes.get();
    },
    states: async () => {
      this.states = await this.manager.source.road.object.ObjectStates.get();
    },
  };
}
