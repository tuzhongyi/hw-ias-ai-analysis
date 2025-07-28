import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';

export class SystemTaskFileDetailsAMapTipIconController {
  private size(): [number, number] {
    return [SizeTool.map.point.width * 0.5, SizeTool.map.point.height * 0.5];
  }

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: PathTool.image.map.point.blue,
      size: this.size(),
      anchor: 'bottom-center',
    };
    return icon;
  }

  get normal() {
    return {
      ...this.opts,
      image: PathTool.image.map.point.blue,
    };
  }
  get selected() {
    return {
      ...this.opts,
      image: PathTool.image.map.point.red,
    };
  }
}
