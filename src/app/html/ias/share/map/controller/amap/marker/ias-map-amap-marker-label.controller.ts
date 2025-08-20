import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemAMapShopIconController } from '../../../../../system/system-map/component/controller/amap/marker/system-map-amap-shop-icon.controller';
import { IASMapAMapMarkerLabelAbstract } from './ias-map-amap-marker-label.abstract';

export class IASMapAMapMarkerLabelController extends IASMapAMapMarkerLabelAbstract<IShop> {
  constructor(data: IShop) {
    super(data);
    this.icon = this.init();
    this.out();
  }

  protected _icon = new SystemAMapShopIconController();

  init() {
    return {
      normal: this._icon.get(this.data.ObjectState).normal,
      hover: this._icon.get(this.data.ObjectState).hover,
      selected: this._icon.get(this.data.ObjectState).selected,
    };
  }
}
