import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { SystemMainMapStateShopItem } from '../system-main-map-state-shop-item/system-main-map-state-shop-item.model';

@Injectable()
export class SystemMainMapStateShopBusiness {
  constructor(private language: LanguageTool) {}

  load(datas: ShopRegistration[]) {
    let data = {
      created: datas.filter((x) => x.ObjectState == ShopObjectState.Created),
      existed: datas.filter((x) => x.ObjectState == ShopObjectState.Existed),
      disappeared: datas.filter(
        (x) => x.ObjectState == ShopObjectState.Disappeared
      ),
    };

    return Promise.all([
      this.convert(ShopObjectState.Created, data.created.length),
      this.convert(ShopObjectState.Existed, data.existed.length),
      this.convert(ShopObjectState.Disappeared, data.disappeared.length),
    ]);
  }

  private async convert(state: ShopObjectState, count: number) {
    let item = new SystemMainMapStateShopItem();
    item.name = await this.language.analysis.shop.ShopObjectState(state);
    item.color = ColorTool.ShopObjectState(state);
    item.value = count;
    item.state = state;
    return item;
  }
}
