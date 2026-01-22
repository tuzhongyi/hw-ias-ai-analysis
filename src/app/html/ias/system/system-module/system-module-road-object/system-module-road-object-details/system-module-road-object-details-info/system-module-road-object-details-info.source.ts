import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/model.interface';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';

@Injectable()
export class SystemModuleRoadObjectDetailsInfoSource {
  types: EnumNameValue<number>[] = [];
  states: EnumNameValue<number>[] = [];
  divisions: IIdNameModel[] = [];
  gridcells: IIdNameModel[] = [];
  loaded?: () => void;
  constructor(
    private manager: Manager,
    private service: ArmDivisionRequestService
  ) {
    this.init.types();
    this.init.states();
    this.init.divisions();
  }

  private init = {
    types: async () => {
      this.types = await this.manager.source.road.object.ObjectTypes.get();
    },
    states: async () => {
      this.states = await this.manager.source.road.object.ObjectStates.get();
    },
    divisions: async () => {
      let divisions = await this.service.cache.all();
      divisions.forEach((x) => {
        if (x.DivisionType == 4) {
          this.gridcells.push(x);
        } else {
          this.divisions.push(x);
        }
      });
      if (this.loaded) {
        this.loaded();
      }
    },
  };
}
