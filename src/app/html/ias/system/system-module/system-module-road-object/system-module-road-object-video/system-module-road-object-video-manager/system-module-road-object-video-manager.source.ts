import { Injectable } from '@angular/core';
import { EnumNameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { Manager } from '../../../../../../../common/data-core/requests/managers/manager';

@Injectable()
export class SystemModuleRoadObjectVideoManagerSource {
  types: Promise<EnumNameValue<number>[]>;
  lines: Promise<EnumNameValue<number>[]>;
  points: Promise<EnumNameValue<number>[]>;
  constructor(private manager: Manager) {
    this.types = this.init.type();
    this.lines = this.init.line();
    this.points = this.init.point();
  }

  private init = {
    type: () => {
      return this.manager.source.road.object.ObjectTypes.get();
    },
    line: () => {
      return this.manager.source.road.object.LineObjectTypes.get();
    },
    point: () => {
      return this.manager.source.road.object.PointObjectTypes.get();
    },
  };
}
