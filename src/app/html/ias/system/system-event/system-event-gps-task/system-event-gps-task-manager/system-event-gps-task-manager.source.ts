import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';

@Injectable()
export class SystemEventGpsTaskManagerSource {
  types: EnumNameValue<number>[] = [];
  constructor(private manager: Manager, private medium: MediumRequestService) {
    this.init.types();
  }

  private init = {
    types: () => {
      this.types = this.manager.source.local.TaskTypes;
    },
  };

  src(url: string) {
    return this.medium.record(url);
  }
}
