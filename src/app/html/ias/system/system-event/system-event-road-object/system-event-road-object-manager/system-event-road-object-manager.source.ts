import { Injectable } from '@angular/core';
import { RoadObjectGeometryType } from '../../../../../../common/data-core/enums/road/road-object/road-object-geometry-type.enum';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { IIdNameModel } from '../../../../../../common/data-core/models/interface/model.interface';
import { Manager } from '../../../../../../common/data-core/requests/managers/manager';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';

@Injectable()
export class SystemEventRoadObjectManagerSource {
  type = {
    point: [] as EnumNameValue<number>[],
    line: [] as EnumNameValue<number>[],
  };

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

  async load(type: RoadObjectGeometryType) {
    switch (type) {
      case RoadObjectGeometryType.point:
        return this.init.types.point();

      case RoadObjectGeometryType.line:
        return this.init.types.line();

      default:
        return [];
    }
  }

  private init = {
    types: {
      point: async () => {
        this.type.point =
          await this.manager.source.road.object.PointObjectTypes.get();
        return this.type.point;
      },
      line: async () => {
        this.type.line =
          await this.manager.source.road.object.LineObjectTypes.get();
        return this.type.line;
      },
    },
    events: async () => {
      this.events = await this.manager.source.road.object.EventTypes.get();
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
