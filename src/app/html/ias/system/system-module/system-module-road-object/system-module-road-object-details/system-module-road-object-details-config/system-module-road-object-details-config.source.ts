import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadObjectDetailsConfigSource {
  plans: EnumNameValue<number>[] = [];
  constructor(private manager: Manager) {
    this.init.plans();
  }

  private init = {
    plans: async () => {
      this.plans =
        await this.manager.source.road.object.ImageSamplingPlans.get();
    },
  };
}
