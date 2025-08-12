import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { IASMapAMapPointAbstract } from './ias-map-amap-point.abstract';

export class IASMapAMapPointExistedController extends IASMapAMapPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected style = {
    radius: 5,
    unit: 'px',
    color: ColorTool.ShopObjectState(ShopObjectState.Existed),
    borderWidth: 0,
    blurWidth: 3,
  };
}
