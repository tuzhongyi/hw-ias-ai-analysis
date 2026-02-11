import { RoadObjectState } from '../../../../../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { ColorTool } from '../../../../../../../../../../../common/tools/color/color.tool';
import { IASMapAMapRoadObjectPointLayerController } from '../../../../../../../../../share/map/controller/amap/road-object/point/ias-map-amap-road-object-point-layer.controller';

export class SystemMainMapAMapRoadObjectPointLayerController extends IASMapAMapRoadObjectPointLayerController {
  constructor(container: Loca.Container) {
    super(container, false);
    this.init(container);
  }

  protected override get = {
    color: (state: RoadObjectState) => {
      return ColorTool.map.cyan;
    },
  };
}
