import { Injectable } from '@angular/core';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectsParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-object/geographic-road-object.params';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import {
  SystemModuleRoadObjectTableArgs,
  SystemModuleRoadObjectTableItem,
} from './system-module-road-object-table.model';

@Injectable()
export class SystemModuleRoadObjectTableBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private language: LanguageTool,
    private division: ArmDivisionRequestService,
    private medium: MediumRequestService
  ) {}

  async load(args: SystemModuleRoadObjectTableArgs) {
    let datas = await this.data(args);
    let items = datas.map((x) => this.convert(x));
    return items;
  }

  convert(source: RoadObject) {
    let item = new SystemModuleRoadObjectTableItem();
    item = Object.assign(item, source);

    item.ObjectTypeName = this.language.road.object.ObjectTypes(
      item.ObjectType
    );
    item.ObjectStateName = this.language.road.object.ObjectStates(
      item.ObjectState
    );
    if (item.DivisionId) {
      item.Division = this.division.cache.get(item.DivisionId);
    }
    if (item.GridCellId) {
      item.GridCell = this.division.cache.get(item.GridCellId);
    }
    if (item.ImageUrl) {
      item.Image = this.medium.picture(item.ImageUrl);
    }
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
