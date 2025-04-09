import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { Road } from '../../../../../../common/data-core/models/arm/analysis/road.model';
import { IShop } from '../../../../../../common/data-core/models/arm/analysis/shop.interface';

@Injectable()
export class SystemMapSource {
  road: Road[] = [];
  shop = new SystemMapShopSource();

  search = {
    ing: false,
    shop: {
      temp: [] as unknown as SystemMapShopSource,
      on: (name: string) => {
        if (name) {
          if (!this.search.ing) {
            this.search.shop.temp = new SystemMapShopSource(...this.shop);
          }
          this.search.ing = true;
          let searched = this.search.shop.temp.filter((x) =>
            x.Name.toLowerCase().includes(name.toLowerCase())
          );
          this.shop = new SystemMapShopSource(...searched);
        } else {
          this.search.ing = false;
          this.shop = new SystemMapShopSource(...this.search.shop.temp);
        }
      },
    },
  };
}

export class SystemMapShopSource extends Array<IShop> {
  get created(): IShop[] {
    return this.filter((x) => x.ObjectState === ShopObjectState.Created) ?? [];
  }
  get existed(): IShop[] {
    return this.filter((x) => x.ObjectState === ShopObjectState.Existed) ?? [];
  }
  get disappeared(): IShop[] {
    return (
      this.filter((x) => x.ObjectState === ShopObjectState.Disappeared) ?? []
    );
  }
}
