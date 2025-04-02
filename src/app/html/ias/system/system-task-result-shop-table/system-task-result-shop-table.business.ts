import { Injectable } from '@angular/core';
import { ArmAnalysisRequestService } from '../../../../common/data-core/requests/services/analysis/analysis.service';
import { GetShopsParams } from '../../../../common/data-core/requests/services/analysis/shop/analysis-shop.params';
import { ArmGeographicRequestService } from '../../../../common/data-core/requests/services/geographic/geographic.service';
import { RoadViewModel } from '../../../../common/view-models/road/road.view-model';
import { ShopConverter } from '../../../../common/view-models/shop/shop.converter';
import {
  SystemTaskResultShopTableFilter,
  SystemTaskResultShopTableItem,
} from './system-task-result-shop-table.model';

@Injectable()
export class SystemTaskResultShopTableBusiness {
  constructor(
    private service: ArmAnalysisRequestService,
    private geo: ArmGeographicRequestService,
    private converter: ShopConverter
  ) {}

  async load(filter: SystemTaskResultShopTableFilter) {
    let shops = await this.data(filter);
    let datas = [];
    for (let i = 0; i < shops.length; i++) {
      let shop = this.converter.convert(shops[i]);
      let item = new SystemTaskResultShopTableItem();
      item = Object.assign(item, shop);
      if (item.RoadId) {
        item.Road = await this.road(item.RoadId);
      }
      datas.push(item);
    }
    return datas;
  }

  private async road(id: string) {
    let data = await this.geo.road.get(id);
    let model = new RoadViewModel();
    model = Object.assign(model, data);
    return model;
  }

  private data(filter: SystemTaskResultShopTableFilter) {
    let params = new GetShopsParams();
    if (filter.taskId) {
      params.TaskIds = [filter.taskId];
    }
    if (filter.channel) {
      params.CameraNos = [filter.channel];
    }
    if (filter.type) {
      params.ShopTypes = [filter.type];
    }
    if (filter.label != undefined) {
      params.ResultLabelTypes = [filter.label];
    }
    if (filter.confidence) {
      params.Confidence = filter.confidence;
    }
    if (filter.name) {
      params.Name = filter.name;
    }
    if (filter.road && filter.road.length > 0) {
      params.RoadIds = filter.road.map((road) => road.Id);
    }
    return this.service.shop.all(params);
  }
}
