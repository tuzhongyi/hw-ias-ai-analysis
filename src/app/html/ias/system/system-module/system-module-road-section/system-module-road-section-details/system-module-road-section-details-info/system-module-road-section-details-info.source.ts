import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/model.interface';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadSectionDetailsInfoSource {
  type = {
    section: new Map<number, string>(),
    event: new Map<number, string>(),
  };

  sections: EnumNameValue<number>[] = [];
  events: IIdNameModel<number>[] = [];

  constructor(private manager: Manager) {
    this.init.section();
    this.init.event();
    this.init.sections();
    this.init.events();
  }

  private init = {
    section: async () => {
      let types = await this.manager.source.road.section.RoadSectionTypes.get();
      types.forEach((x) => {
        this.type.section.set(x.Value, x.Name);
      });
    },

    event: async () => {
      let types = await this.manager.source.event.EventTypes.get();
      types.forEach((x) => {
        this.type.event.set(x.Value, x.Name);
      });
    },
    sections: async () => {
      this.sections =
        await this.manager.source.road.section.RoadSectionTypes.get();
    },
    events: async () => {
      let events = await this.manager.source.event.EventTypes.get();
      this.events = events.map((x) => ({
        Id: x.Value,
        Name: x.Name,
      }));
    },
  };
}
