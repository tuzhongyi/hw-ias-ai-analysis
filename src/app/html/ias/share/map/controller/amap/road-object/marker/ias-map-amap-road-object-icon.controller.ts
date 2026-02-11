import { RoadObjectState } from '../../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObjectType } from '../../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';

export class IASMapAMapRoadObjectIconController {
  private size(): [number, number] {
    return [SizeTool.map.object.width, SizeTool.map.object.height];
  }

  protected get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: PathTool.image.map.object.unknow.gray.normal,
      size: this.size(),
      anchor: 'bottom-center',
    };
    return icon;
  }
  get(type?: RoadObjectType, state?: RoadObjectState) {
    let image = PathTool.image.map.object.get(type, state);
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
