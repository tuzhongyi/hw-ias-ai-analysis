import { Injectable } from '@angular/core';
import { RoadObjectStock } from '../../../../../../common/data-core/models/arm/geographic/road-object-stock.model';
import { ArmDivisionRequestService } from '../../../../../../common/data-core/requests/services/division/division.service';
import { ArmGeographicRequestService } from '../../../../../../common/data-core/requests/services/geographic/geographic.service';
import { GetRoadObjectStocksParams } from '../../../../../../common/data-core/requests/services/geographic/road/road-object/stock/geographic-road-object-stock.params';
import { MediumRequestService } from '../../../../../../common/data-core/requests/services/medium/medium.service';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import {
  RoadObjectStockModel,
  SystemModuleRoadObjectStockTableArgs,
} from './system-module-road-object-stock-table.model';

@Injectable()
export class SystemModuleRoadObjectStockTableBusiness {
  constructor(
    private service: ArmGeographicRequestService,
    private language: LanguageTool,
    private division: ArmDivisionRequestService,
    private medium: MediumRequestService
  ) {}

  async load(args: SystemModuleRoadObjectStockTableArgs) {
    let datas = await this.data(args);
    let items = datas.map((x) => this.convert(x));
    return items;
  }

  convert(source: RoadObjectStock) {
    let item = new RoadObjectStockModel();
    item = Object.assign(item, source);

    item.ObjectTypeName = this.language.road.object.ObjectTypes(
      item.ObjectType
    );

    if (item.DivisionId) {
      item.Division = this.division.cache.get(item.DivisionId);
      if (item.Address) {
        let address = item.Address;
        item.AddressSubed = item.Division.then((x) => {
          let index = address.indexOf(x.Name);
          if (index != undefined && index != -1) {
            return address.substring(index + x.Name.length);
          }
          return address;
        });
      }
    }
    if (item.GridCellId) {
      item.GridCell = this.division.cache.get(item.GridCellId);
    }
    if (item.ImageUrl) {
      item.Image = this.medium.picture(item.ImageUrl);
    }

    return item;
  }

  private data(args: SystemModuleRoadObjectStockTableArgs) {
    let params = new GetRoadObjectStocksParams();
    if (args.name) {
      params.Name = args.name;
    }
    if (args.type != undefined) {
      params.ObjectTypes = [args.type];
    }

    return this.service.road.object.stock.all(params);
  }
}
