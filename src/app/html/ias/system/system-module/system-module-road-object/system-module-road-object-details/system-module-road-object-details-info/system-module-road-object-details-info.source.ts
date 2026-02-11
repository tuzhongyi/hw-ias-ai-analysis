import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/model.interface';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';
import { ArmDivisionRequestService } from '../../../../../../../common/data-core/requests/services/division/division.service';

@Injectable()
export class SystemModuleRoadObjectDetailsInfoSource {
  types: EnumNameValue<number>[] = [];
  states: EnumNameValue<number>[] = [];
  divisions: Promise<IIdNameModel[]>;
  gridcells: Promise<IIdNameModel[]>;

  constructor(
    private manager: Manager,
    private service: ArmDivisionRequestService
  ) {
    this.init.types();
    this.init.states();
    let source = this.init.divisions();
    this.divisions = new Promise<IIdNameModel[]>((resolve) => {
      source.then((x) => {
        resolve(x.divisions);
      });
    });
    this.gridcells = new Promise<IIdNameModel[]>((resolve) => {
      source.then((x) => {
        resolve(x.gridcells);
      });
    });
  }

  private init = {
    types: async () => {
      this.types = await this.manager.source.road.object.ObjectTypes.get();
    },
    states: async () => {
      this.states = await this.manager.source.road.object.ObjectStates.get();
    },
    divisions: async () => {
      let source = await this.service.cache.all();
      let divisions: IIdNameModel[] = [];
      let gridcells: IIdNameModel[] = [];

      source.forEach((x) => {
        if (x.DivisionType == 4) {
          gridcells.push(x);
        } else {
          divisions.push(x);
        }
      });

      return {
        divisions,
        gridcells,
      };
    },
  };
}
