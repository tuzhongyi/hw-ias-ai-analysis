import { Injectable } from '@angular/core';
import { IIdNameModel } from '../../../../../../../common/data-core/models/interface/model.interface';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadPointDetailsInfoSource {
  type = {
    point: [] as IIdNameModel<number>[],
    event: [] as IIdNameModel<number>[],
    roadobject: [] as IIdNameModel<number>[],
  };
  constructor(private manager: Manager) {
    this.init.point();
    this.init.event();
    this.init.roadobject();
  }

  private init = {
    point: async () => {
      let types = await this.manager.source.road.point.RoadPointTypes.get();
      this.type.point = types.map((x) => {
        return { Id: x.Value, Name: x.Name };
      });
    },
    event: async () => {
      let types = await this.manager.source.event.EventTypes.get();
      this.type.event = types.map((x) => {
        return { Id: x.Value, Name: x.Name };
      });
    },
    roadobject: async () => {
      let types = await this.manager.source.road.object.ObjectTypes.get();
      this.type.roadobject = types.map((x) => {
        return { Id: x.Value, Name: x.Name };
      });
    },
  };
}
