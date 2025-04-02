import { Injectable } from '@angular/core';
import { Road } from '../../../../../common/data-core/models/arm/analysis/road.model';
import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import { ArmGeographicRequestService } from '../../../../../common/data-core/requests/services/geographic/geographic.service';
import { RoadViewModel } from '../../../../../common/view-models/road/road.view-model';
import { ShopConverter } from '../../../../../common/view-models/shop/shop.converter';
import { SystemMapSourceTableShopItem } from '../system-map-source-table-shop.model';

@Injectable()
export class SystemMapSourceTableShopConverter {
  constructor(
    private shop: ShopConverter,
    private geo: ArmGeographicRequestService
  ) {}

  private roads = new Map<string, Road>();

  async convert(shop: Shop) {
    let model = this.shop.convert(shop);

    let item = new SystemMapSourceTableShopItem();
    item = Object.assign(item, model);
    if (item.RoadId) {
      item.Road = await this.road(item.RoadId);
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
