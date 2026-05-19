import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IIdNameModel } from '../../../../../../common/data-core/models/interface/model.interface';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';

@Injectable()
export class SystemModuleSecurityDepartmentSource {
  events: EnumNameValue<number>[] = [];
  divisions: IIdNameModel[] = [];
  gridcells: IIdNameModel[] = [];
  constructor(
    private manager: Manager,
    private service: ArmDivisionRequestService
  ) {
    this.init.events();
    this.init.divisions();
  }

  private init = {
    events: async () => {
      this.events = await this.manager.source.event.EventTypes.get();
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
