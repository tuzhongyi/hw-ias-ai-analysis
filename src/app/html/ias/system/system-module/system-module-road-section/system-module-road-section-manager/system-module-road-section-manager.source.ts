import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadSectionManagerSource {
  sections: EnumNameValue<number>[] = [];

  constructor(private manager: Manager) {
    this.init.sections();
  }

  private init = {
    sections: async () => {
      this.sections =
        await this.manager.source.road.section.RoadSectionTypes.get();
    },
  };
}
