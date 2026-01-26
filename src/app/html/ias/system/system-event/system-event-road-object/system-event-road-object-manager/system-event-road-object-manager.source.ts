import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IIdNameModel } from '../../../../../../common/data-core/models/model.interface';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';

@Injectable()
export class SystemEventRoadObjectManagerSource {
  types: EnumNameValue<number>[] = [];
  events: EnumNameValue<number>[] = [];
  divisions: IIdNameModel[] = [];
  gridcells: IIdNameModel[] = [];
  constructor(
    private manager: Manager,
    private service: ArmDivisionRequestService
  ) {
    this.init.types();
    this.init.events();
    this.init.divisions();
  }

  private init = {
    types: async () => {
      this.types = await this.manager.source.road.object.ObjectTypes.get();
    },
    events: async () => {
      this.events = await this.manager.source.road.object.EventTypes.get();
    },
    divisions: async () => {
      let datas = await this.service.cache.all();
      datas.forEach((x) => {
        if (x.DivisionType == 4) {
          this.gridcells.push(x);
        } else {
          this.divisions.push(x);
        }
      });
    },
  };
}
