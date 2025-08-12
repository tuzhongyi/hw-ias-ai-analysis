import { PathTool } from '../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../common/tools/size-tool/size.tool';
import { MapMarkerShopColor, MapMarkerType } from '../../../ias-map.model';

export class IASMapAMapIconController {
  private type = MapMarkerType.other;
  private color?: MapMarkerShopColor;
  private is = {
    selected: false,
    hover: false,
  };

  private get icon() {
    let _default = PathTool.image.map.point.red;

    switch (this.type) {
      case MapMarkerType.shop:
        let color = this.color ?? MapMarkerShopColor.green;

        if (this.is.selected) {
          if (this.is.hover) {
            return PathTool.image.map.shop[color].hover;
          }
          return PathTool.image.map.shop[color].normal;
        }
        if (this.is.hover) {
          return PathTool.image.map.shop[color].hover;
        }
        return PathTool.image.map.shop[color].normal;
      default:
        return _default;
    }
  }
  private get size(): [number, number] {
    let _default: [number, number] = [
      SizeTool.map.point.width * 0.7,
      SizeTool.map.point.height * 0.7,
    ];
    switch (this.type) {
      case MapMarkerType.shop:
        return [SizeTool.map.shop.width * 0.7, SizeTool.map.shop.height * 0.7];
      default:
        return _default;
    }
  }
  private _get() {
    let icon = new AMap.Icon({
      imageSize: this.size,
      size: this.size,
      image: this.icon,
      anchor: 'bottom-center',
    });
    return icon;
  }

  get(type: MapMarkerType, color?: MapMarkerShopColor) {
    this.type = type;
    this.color = color;
    return this._get();
  }

  mouse = {
    over: () => {
      this.is.hover = true;
      return this._get();
    },
    out: () => {
      this.is.hover = false;
      return this._get();
    },
  };

  select(selected: boolean) {
    this.is.selected = selected;
    return this._get();
  }

  get offset() {
    return new AMap.Pixel(-this.size[0] / 2, -this.size[1]);
  }
}
