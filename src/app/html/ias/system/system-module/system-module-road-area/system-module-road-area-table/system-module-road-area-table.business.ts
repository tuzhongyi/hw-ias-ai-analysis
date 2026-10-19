import { Injectable } from '@angular/core';
import { RoadArea } from '../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadAreasParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-area/geographic-road-area.params';
import {
  SystemModuleRoadAreaTableArgs,
  SystemModuleRoadAreaTableItem,
} from './system-module-road-area-table.model';
import { SystemModuleRoadAreaTableSource } from './system-module-road-area-table.source';

@Injectable()
export class SystemModuleRoadAreaTableBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private source: SystemModuleRoadAreaTableSource,
  ) {}

  async load(args: SystemModuleRoadAreaTableArgs) {
    let datas = await this.data(args);
    let items = datas.map((x) => this.convert(x));
    return items;
  }

  convert(source: RoadArea) {
    let item = new SystemModuleRoadAreaTableItem();
    item = Object.assign(item, source);
    if (item.EventTypes) {
      item.EventTypeNames = item.EventTypes.map((x) => {
        return this.source.type.event.get(x)!;
      }).join('，');
    }
    return item;
  }

  private data(args: SystemModuleRoadAreaTableArgs) {
    let params = new GetRoadAreasParams();
    params.Name = args.name;
    if (args.type != undefined) {
      // 协议里这个字段是数组（UsageTypes），不是单个值
      params.UsageTypes = [args.type];
    }

    return this.service.road.area.all(params);
  }
}
