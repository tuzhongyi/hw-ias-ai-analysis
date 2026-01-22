import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import { IASMapAMapPointAbstract } from '../../point/ias-map-amap-point.abstract';

export class IASMapAMapPointCreatedController extends IASMapAMapPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected get style() {
    return {
      radius: 5,
      unit: 'px',
      color: ColorTool.ShopObjectState(ShopObjectState.Created),
      borderWidth: 0,
      blurWidth: 3,
    };
  }
}
