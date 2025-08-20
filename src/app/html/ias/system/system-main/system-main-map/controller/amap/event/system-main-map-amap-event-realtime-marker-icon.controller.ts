import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';

export class SystemMainMapAMapAlarmMarkerIconController {
  private size(): [number, number] {
    return [SizeTool.map.alarm.width * 0.5, SizeTool.map.alarm.width * 0.5];
  }

  get icon(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: PathTool.image.map.alarm.icon.red,
      size: this.size(),
      anchor: 'center',
    };
    return icon;
  }
}
