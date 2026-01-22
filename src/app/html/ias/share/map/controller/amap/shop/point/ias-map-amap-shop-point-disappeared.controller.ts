import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ColorTool } from '../../../../../../../../common/tools/color/color.tool';
import { IASMapAMapPointAbstract } from '../../point/ias-map-amap-point.abstract';

export class IASMapAMapPointDisappearedController extends IASMapAMapPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected style = {
    radius: 5,
    unit: 'px',
    color: ColorTool.ShopObjectState(ShopObjectState.Disappeared),
    borderWidth: 0,
    blurWidth: 3,
  };
}
