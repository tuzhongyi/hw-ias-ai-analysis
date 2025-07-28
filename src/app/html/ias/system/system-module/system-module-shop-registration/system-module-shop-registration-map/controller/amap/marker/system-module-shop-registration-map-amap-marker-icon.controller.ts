import { PathTool } from '../../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../../common/tools/size-tool/size.tool';

export class SystemModuleShopRegistrationMapAMapMarkerIconController {
  icon: AMap.Icon;

  constructor() {
    this.icon = this.create();
  }

  private create() {
    let icon = new AMap.Icon({
      imageSize: this.size,
      size: this.size,
      image: PathTool.image.map.shop.blue.normal,
    });
    return icon;
  }

  size: [number, number] = [
    SizeTool.map.shop.width * 0.7,
    SizeTool.map.shop.height * 0.7,
  ];

  get over() {
    this.icon.setImage(PathTool.image.map.shop.blue.hover);
    return this.icon;
  }
  get out() {
    this.icon.setImage(PathTool.image.map.shop.blue.normal);
    return this.icon;
  }
  get selected() {
    this.icon.setImage(PathTool.image.map.shop.blue.selected);
    return this.icon;
  }
}
