import { RoadObjectType } from '../../../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainMapAMapRoadObjectIconController {
  private size(): [number, number] {
    return [SizeTool.map.object.width, SizeTool.map.object.height];
  }

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: PathTool.image.map.object.unknow.normal,
      size: this.size(),
      anchor: 'bottom-center',
    };
    return icon;
  }
  get(type?: RoadObjectType) {
    let image = this._get.image(type);
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

  private _get = {
    image: (type?: RoadObjectType) => {
      switch (type) {
        case RoadObjectType.BusStation:
          return PathTool.image.map.object.busstation;
        case RoadObjectType.FireHydrant:
          return PathTool.image.map.object.firehydrant;
        case RoadObjectType.Passage:
          return PathTool.image.map.object.passage;
        case RoadObjectType.TrashCan:
          return PathTool.image.map.object.trashcan;
        default:
          return PathTool.image.map.object.unknow;
      }
    },
  };
}
