import { LocaleCompare } from '../../../../../tools/compare-tool/compare.tool';
import { IService } from '../../../../cache/cache.interface';
import { ServiceCache } from '../../../../cache/service.cache';

import { ShopRegistration } from '../../../../models/arm/geographic/shop-registration.model';
import { GetShopRegistrationsParams } from './geographic-shop.params';

export class ShopRegistrationCache extends ServiceCache<ShopRegistration> {
  constructor(key: string, service: IService<ShopRegistration>) {
    super(key, service, ShopRegistration);
  }
  override filter(
    datas: ShopRegistration[],
    params: GetShopRegistrationsParams
  ): ShopRegistration[] {
    if (params.Ids && params.Ids.length > 0) {
      datas = datas.filter((x) => {
        return params.Ids!.includes(x.Id);
      });
    }
    if (params.ObjectStates && params.ObjectStates.length > 0) {
      datas = datas.filter((x) => {
        if (x.ObjectState === undefined) return false;
        return params.ObjectStates!.includes(x.ObjectState);
      });
    }
    if (params.Name) {
      datas = datas.filter((x) => {
        return (x.Name ?? '')
          .toLocaleLowerCase()
          .includes((params.Name ?? '').toLocaleLowerCase());
      });
    }
    if (params.BusinessStates) {
      datas = datas.filter((x) => {
        if (x.BusinessState === undefined) return false;
        return params.BusinessStates!.includes(x.BusinessState);
      });
    }
    if (params.AssociatedCount) {
      datas = datas.filter((x) => {
        return (x.AssociatedCount ?? 0) >= params.AssociatedCount!;
      });
    }
    if (params.Asc) {
      datas = datas.sort((a, b) => {
        let _a = a as any;
        let _b = b as any;
        return LocaleCompare.compare(_a[params.Asc!], _b[params.Asc!], true);
      });
    } else if (params.Desc) {
      datas = datas.sort((a, b) => {
        let _a = a as any;
        let _b = b as any;
        return LocaleCompare.compare(_a[params.Desc!], _b[params.Desc!], false);
      });
    }
    return datas;
  }
}
