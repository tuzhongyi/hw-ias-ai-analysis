import { Injectable } from '@angular/core';
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadPointsParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-point/geographic-road-point.params';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import {
  SystemModuleRoadPointTableArgs,
  SystemModuleRoadPointTableItem,
} from './system-module-road-point-table.model';

@Injectable()
export class SystemModuleRoadPointTableBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private language: LanguageTool
  ) {}

  async load(args: SystemModuleRoadPointTableArgs) {
    let datas = await this.data(args);
    let items = datas.map((x) => this.convert(x));
    return items;
  }

  convert(source: RoadPoint) {
    let item = new SystemModuleRoadPointTableItem();
    item = Object.assign(item, source);

    if (item.EventTypes && item.EventTypes.length > 0) {
      let names = item.EventTypes.map((x) => {
        return this.language.event.EventType(x);
      });
      Promise.all(names).then((values) => {
        item.EventTypeNames = values.join(',');
      });
    }
    if (item.RoadObjectTypes && item.RoadObjectTypes.length > 0) {
      let names = item.RoadObjectTypes.map((x) => {
        return this.language.road.object.ObjectTypes(x);
      });
      Promise.all(names).then((values) => {
        item.RoadObjectTypeNames = values.join(',');
      });
    }
    item.PointTypeName = this.language.road.point.RoadPointTypes(
      item.PointType
    );

    return item;
  }

  private data(args: SystemModuleRoadPointTableArgs) {
    let params = new GetRoadPointsParams();
    params.Name = args.name;
    if (args.type != undefined) {
      params.PointTypes = [args.type];
    }
    return this.service.road.point.all(params);
  }
}
