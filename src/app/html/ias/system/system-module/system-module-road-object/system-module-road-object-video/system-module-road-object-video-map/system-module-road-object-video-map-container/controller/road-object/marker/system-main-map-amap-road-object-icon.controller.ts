import { RoadObjectState } from '../../../../../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObjectType } from '../../../../../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { PathTool } from '../../../../../../../../../../../common/tools/path-tool/path.tool';
import { IASMapAMapRoadObjectIconController } from '../../../../../../../../../share/map/controller/amap/road-object/marker/ias-map-amap-road-object-icon.controller';

export class SystemMainMapAMapRoadObjectIconController extends IASMapAMapRoadObjectIconController {
  override get(type?: RoadObjectType) {
    let image = PathTool.image.map.object.get(type, RoadObjectState.Normal);
    return {
      normal: {
        ...this.opts,
        image: image.normal,
      },
      hover: {
        ...this.opts,
        image: image.hover,
      },
      selected: {
        ...this.opts,
        image: image.selected,
      },
    };
  }
}
