import { Injectable } from '@angular/core';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectsParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-object/geographic-road-object.params';
import {
  SystemModuleRoadObjectTableArgs,
  SystemModuleRoadObjectTableItem,
} from './system-module-road-object-table.model';

@Injectable()
export class SystemModuleRoadObjectTableBusiness {
  constructor(private service: ArmGeographicRequestService) {}

  async load(args: SystemModuleRoadObjectTableArgs) {
    let datas = await this.data(args);
    let items = datas.map((x) => this.convert(x));
    return items;
  }

  convert(source: RoadObject) {
    let item = new SystemModuleRoadObjectTableItem();
    item = Object.assign(item, source);

    return item;
  }

  private data(args: SystemModuleRoadObjectTableArgs) {
    let params = new GetRoadObjectsParams();
    if (args.name) {
      params.Name = args.name;
    }
    if (args.address) {
      params.Address = args.address;
    }
    if (args.type != undefined) {
      params.ObjectTypes = [args.type];
    }
    if (args.division) {
      params.DivisionIds = [args.division];
    }
    if (args.state != undefined) {
      params.ObjectStates = [args.state];
    }
    if (args.category != undefined) {
      params.Category = args.category;
    }

    return this.service.road.object.all(params);
  }
}
