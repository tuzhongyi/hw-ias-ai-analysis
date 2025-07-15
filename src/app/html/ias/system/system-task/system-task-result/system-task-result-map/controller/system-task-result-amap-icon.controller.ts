import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';

export class SystemTaskResultAMapIconController {
  constructor() {}

  create1(selected = false) {
    let src = this.icon(selected);
    let width = 76;
    let height = 88;
    let icon: AMap.Icon;
    let ratio = 0.7;
    if (!selected) {
      ratio = 0.7;
    }
    let opts: AMap.IconOpts = {
      size: [width * ratio, height * ratio],
      image: src,
      imageSize: [width * ratio, height * ratio],
      // imageOffset: [-width / ratio / 2, -height / ratio],
      anchor: 'bottom-center',
    };
    icon = new AMap.Icon(opts);

    return icon;
  }
  private icon(selected = false) {
    if (selected) {
      return PathTool.image.map.shop.green.normal;
    }
    return PathTool.image.map.shop.white.normal;
  }
  private size(selected = false): [number, number] {
    let width = 76;
    let height = 88;
    let ratio = 0.3;
    if (selected) {
      ratio = 0.7;
    }
    return [width * ratio, height * ratio];
  }
  create(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: this.icon(false),
      size: this.size(false),
      anchor: 'bottom-center',
    };
    return icon;
  }

  get(selected = false) {
    return {
      image: this.icon(selected),
      size: this.size(selected),
    };
  }
}
