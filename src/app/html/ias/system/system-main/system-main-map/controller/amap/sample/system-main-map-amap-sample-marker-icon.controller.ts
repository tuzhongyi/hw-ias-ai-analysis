import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainMapAMapSampleMarkerIconController {
  private size(): [number, number] {
    return [SizeTool.map.alarm.normal.width, SizeTool.map.alarm.normal.height];
  }

  get icon(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: PathTool.image.map.alarm.icon.cyan,
      size: this.size(),
      anchor: 'center',
    };
    return icon;
  }
}
