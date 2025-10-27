import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';

@Injectable()
export class SystemModuleGpsTaskManagerSource {
  groups: UserGroup[] = [];
  types: EnumNameValue[] = [];
  constructor(
    private service: ArmSystemRequestService,
    private manager: Manager
  ) {
    this.init.groups();
  }

  private init = {
    groups: () => {
      this.service.security.user.group().then((x) => {
        this.groups = x;
      });
    },
    types: () => {
      this.manager.source.analysis.llm.SceneTypes.get().then((x) => {
        this.types = x;
      });
    },
  };
}
