import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { ISystemAMapShopIconController } from './system-map-amap-shop-marker.model';

export class SystemAMapShopIconController
  implements ISystemAMapShopIconController
{
  private size(selected = false): [number, number] {
    if (selected) {
      return [SizeTool.map.shop.width * 0.7, SizeTool.map.shop.width * 0.7];
    }

    return [SizeTool.map.shop.width * 0.7, SizeTool.map.shop.width * 0.7];
  }

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: PathTool.image.map.shop.white.normal,
      size: this.size(),
      anchor: 'bottom-center',
    };
    return icon;
  }

  get created() {
    return {
      normal: {
        ...this.opts,
        image: PathTool.image.map.shop.green.normal,
      },
      hover: {
        ...this.opts,
        image: PathTool.image.map.shop.green.hover,
      },
      selected: {
        ...this.opts,
        size: this.size(true),
        image: PathTool.image.map.shop.green.selected,
      },
    };
  }
  get disappeared() {
    return {
      normal: {
        ...this.opts,
        image: PathTool.image.map.shop.orange.normal,
      },
      hover: {
        ...this.opts,
        image: PathTool.image.map.shop.orange.hover,
      },
      selected: {
        ...this.opts,
        size: this.size(true),
        image: PathTool.image.map.shop.orange.selected,
      },
    };
  }
  get existed() {
    return {
      normal: {
        ...this.opts,
        image: PathTool.image.map.shop.blue.normal,
      },
      hover: {
        ...this.opts,
        image: PathTool.image.map.shop.blue.hover,
      },
      selected: {
        ...this.opts,
        size: this.size(true),
        image: PathTool.image.map.shop.blue.selected,
      },
    };
  }

  get(type: ShopObjectState) {
    switch (type) {
      case ShopObjectState.Created:
        return this.created;
      case ShopObjectState.Disappeared:
        return this.disappeared;
      case ShopObjectState.Existed:
        return this.existed;
      default:
        throw new Error('ShopObjectState is not defined');
    }
  }
}
