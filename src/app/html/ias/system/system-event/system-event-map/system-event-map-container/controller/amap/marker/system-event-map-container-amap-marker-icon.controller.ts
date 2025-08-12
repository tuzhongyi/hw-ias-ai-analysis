import { MobileEventRecord } from '../../../../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../common/tools/size-tool/size.tool';

export class SystemEventMapContainerAMapMarkerIconController {
  constructor() {}

  private icon = {
    handled: this.create(PathTool.image.map.alarm.green),
    unhandle: this.create(PathTool.image.map.alarm.orange),
    misinform: this.create(PathTool.image.map.alarm.cyan),
  };
  size: [number, number] = [
    SizeTool.map.alarm.width * 0.1,
    SizeTool.map.alarm.height * 0.1,
  ];
  offset: [number, number] = [-this.size[0] / 2, -this.size[1] / 2];

  private create(image: string) {
    let icon = {
      type: 'image',
      image: image,
      size: this.size,
      anchor: 'center',
    };
    return icon;
  }

  get(data: MobileEventRecord) {
    if (data.Assignment?.Handled) {
      if (data.Assignment?.IsMisInfo) {
        return this.icon.misinform;
      } else {
        return this.icon.handled;
      }
    } else {
      return this.icon.unhandle;
    }
  }
}
