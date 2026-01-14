import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleMobileDeviceRouteAMapIconController {
  private size(): [number, number] {
    return [
      SizeTool.map.device.mobile.width,
      SizeTool.map.device.mobile.height,
    ];
  }

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: PathTool.image.map.device.mobile.online,
      size: this.size(),
      anchor: 'center',
    };
    return icon;
  }

  get online() {
    return {
      ...this.opts,
      image: PathTool.image.map.device.mobile.online,
    };
  }
  get offline() {
    return {
      ...this.opts,
      image: PathTool.image.map.device.mobile.offline,
    };
  }
}
