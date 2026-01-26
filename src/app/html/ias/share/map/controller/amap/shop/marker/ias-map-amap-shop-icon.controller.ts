import { IMapMarkerPath } from '../../../../../../../../common/tools/path-tool/path-map/marker/map-marker.interface';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';
import { MapMarkerColor, MapMarkerType } from '../../../../ias-map.model';

export class IASMapAMapIconController {
  private type = MapMarkerType.other;
  private color?: MapMarkerColor;
  private is = {
    selected: false,
    hover: false,
  };

  private get icon() {
    let _default = PathTool.image.map.point.red;
    switch (this.type) {
      case MapMarkerType.shop:
        return this._get.image.shop();
      case MapMarkerType.roadobject:
        return this._get.image.object();
      default:
        return _default;
    }
  }
  private get size(): [number, number] {
    let _default: [number, number] = [
      SizeTool.map.point.normal.width,
      SizeTool.map.point.normal.height,
    ];
    switch (this.type) {
      case MapMarkerType.shop:
        return [SizeTool.map.shop.width, SizeTool.map.shop.height];
      case MapMarkerType.roadobject:
        return [SizeTool.map.object.width, SizeTool.map.object.height];
      default:
        return _default;
    }
  }
  private _get = {
    image: {
      shop: () => {
        let color = this.color ?? MapMarkerColor.green;
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
      },
      object: () => {
        let path: IMapMarkerPath;
        switch (this.color) {
          case MapMarkerColor.green:
            path = PathTool.image.map.object.trashcan;
            break;
          case MapMarkerColor.red:
            path = PathTool.image.map.object.firehydrant;
            break;
          case MapMarkerColor.blue:
            path = PathTool.image.map.object.busstation;
            break;
          case MapMarkerColor.orange:
            path = PathTool.image.map.object.passage;
            break;

          default:
            path = PathTool.image.map.object.unknow;
            break;
        }

        if (this.is.selected) {
          if (this.is.hover) {
            return path.hover;
          }
          return path.normal;
        }
        if (this.is.hover) {
          return path.hover;
        }
        return path.normal;
      },
    },
    icon: () => {
      let icon = new AMap.Icon({
        imageSize: this.size,
        size: this.size,
        image: this.icon,
        anchor: 'bottom-center',
      });
      return icon;
    },
  };

  get(type: MapMarkerType, color?: MapMarkerColor) {
    this.type = type;
    this.color = color;
    return this._get.icon();
  }

  mouse = {
    over: () => {
      this.is.hover = true;
      return this._get.icon();
    },
    out: () => {
      this.is.hover = false;
      return this._get.icon();
    },
  };

  select(selected: boolean) {
    this.is.selected = selected;
    return this._get.icon();
  }

  get offset() {
    return new AMap.Pixel(-this.size[0] / 2, -this.size[1]);
  }
}
