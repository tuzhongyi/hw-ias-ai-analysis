import { Injectable } from '@angular/core';
import { Road } from '../../../../../common/data-core/models/arm/analysis/road.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { IShop } from '../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import { ArmGeographicRequestService } from '../../../../../common/data-core/requests/services/geographic/geographic.service';
import { LanguageTool } from '../../../../../common/tools/language.tool';
import { RoadViewModel } from '../../../../../common/view-models/road/road.view-model';
import {
  SystemMapSourceTableShopFrom,
  SystemMapSourceTableShopItem,
} from '../system-map-source-table-shop.model';

@Injectable()
export class SystemMapSourceTableShopConverter {
  constructor(
    private geo: ArmGeographicRequestService,
    private language: LanguageTool
  ) {}

  private roads = new Map<string, Road>();

  async convert(shop: IShop) {
    let item = new SystemMapSourceTableShopItem();
    item = Object.assign(item, shop);
    item.ObjectStateName = await this.language.ShopObjectState(
      item.ObjectState
    );
    if (item.RoadId) {
      item.Road = await this.road(item.RoadId);
    }

    if (shop instanceof Shop) {
      item.from = SystemMapSourceTableShopFrom.task;
    } else if (shop instanceof ShopRegistration) {
      item.from = SystemMapSourceTableShopFrom.registration;
    }

    return item;
  }

  private async road(id: string) {
    let road: Road;
    if (this.roads.has(id)) {
      road = this.roads.get(id)!;
    } else {
      road = await this.geo.road.get(id);
      this.roads.set(id, road);
    }

    let model = new RoadViewModel();
    model = Object.assign(model, road);
    return model;
  }
}
