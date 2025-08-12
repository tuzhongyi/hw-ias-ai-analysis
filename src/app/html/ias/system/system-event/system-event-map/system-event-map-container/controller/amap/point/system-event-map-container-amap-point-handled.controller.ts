import { ColorTool } from '../../../../../../../../../common/tools/color/color.tool';
import { IASMapAMapPointAbstract } from '../../../../../../../share/map/controller/amap/point/ias-map-amap-point.abstract';

export class SystemEventMapContainerAMapPointHandledController extends IASMapAMapPointAbstract {
  constructor(container: Loca.Container) {
    super(container);
  }
  protected style = {
    radius: 5,
    unit: 'px',
    color: ColorTool.green,
    borderWidth: 0,
    blurWidth: 3,
  };
}
