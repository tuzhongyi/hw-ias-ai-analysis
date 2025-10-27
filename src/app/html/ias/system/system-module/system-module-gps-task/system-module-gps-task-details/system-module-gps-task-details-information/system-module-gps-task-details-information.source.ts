import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleGpsTaskDetailsInformationSource {
  type: TypeSource = {};
  constructor(private manager: Manager) {
    this.init.type.task();
    this.init.type.source();
  }

  private init = {
    type: {
      task: () => {
        this.type.task = this.manager.source.local.TaskTypes;
      },
      source: () => {
        this.type.source = this.manager.source.local.SourceTypes;
      },
    },
  };
}

interface TypeSource {
  task?: EnumNameValue<number>[];
  source?: EnumNameValue<number>[];
}
