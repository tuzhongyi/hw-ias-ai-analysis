import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleGpsTaskManagerSource {
  groups: UserGroup[] = [];
  types: EnumNameValue<number>[] = [];
  constructor(
    private service: ArmSystemRequestService,
    private manager: Manager
  ) {
    this.init.groups();
    this.init.types();
  }

  private init = {
    groups: () => {
      this.service.security.user.group().then((x) => {
        this.groups = x;
      });
    },
    types: () => {
      this.types = this.manager.source.local.TaskTypes;
    },
  };
}
