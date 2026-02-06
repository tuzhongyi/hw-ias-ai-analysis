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
      case MapMarkerType.busstation:
      case MapMarkerType.passage:
      case MapMarkerType.firehydrant:
      case MapMarkerType.trashcan:
      case MapMarkerType.telephonebooth:
      case MapMarkerType.unknow:
        return this._get.image.object(this.type);

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
      case MapMarkerType.busstation:
      case MapMarkerType.passage:
      case MapMarkerType.firehydrant:
      case MapMarkerType.trashcan:
      case MapMarkerType.telephonebooth:
      case MapMarkerType.unknow:
        return [SizeTool.map.object.width, SizeTool.map.object.height];
      default:
        return _default;
    }
  }
  private _get = {
    image: {
      shop: () => {
        let color = MapMarkerColor.green;
        if (this.color == MapMarkerColor.gray) {
        } else if (this.color) {
          color == this.color;
        }
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
      object: (type: MapMarkerType) => {
        let color = MapMarkerColor.blue;

        if (this.color == MapMarkerColor.gray) {
        } else if (this.color) {
          color == this.color;
        }
        let key = color == MapMarkerColor.blue ? 'cyan' : MapMarkerColor.blue;
        let obj: any;
        if (type == MapMarkerType.unknow) {
          if (this.is.selected) {
            if (this.is.hover) {
              return PathTool.image.map.object.unknow.hover;
            }
            return PathTool.image.map.object.unknow.normal;
          }
          if (this.is.hover) {
            return PathTool.image.map.object.unknow.hover;
          }
          return PathTool.image.map.object.unknow.normal;
        } else {
          obj = this._get.image.type(type) as any;
        }

        if (this.is.selected) {
          if (this.is.hover) {
            return obj[key].hover;
          }
          return obj[key].normal;
        }
        if (this.is.hover) {
          return obj[key].hover;
        }
        return obj[key].normal;
      },
      type: (type: MapMarkerType) => {
        switch (type) {
          case MapMarkerType.busstation:
            return PathTool.image.map.object.busstation;
          case MapMarkerType.passage:
            return PathTool.image.map.object.passage;
          case MapMarkerType.firehydrant:
            return PathTool.image.map.object.firehydrant;
          case MapMarkerType.trashcan:
            return PathTool.image.map.object.trashcan;
          case MapMarkerType.telephonebooth:
            return PathTool.image.map.object.telephonebooth;

          default:
            return undefined;
        }
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
