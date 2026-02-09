import { IMapMarkerPath } from '../../../../../../../../common/tools/path-tool/path-map/marker/map-marker.interface';
import { PathTool } from '../../../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../../../common/tools/size-tool/size.tool';

export class IASMapAMapIconController {
  path: string | IMapMarkerPath;
  size: [number, number];
  constructor(
    path: string | IMapMarkerPath = PathTool.image.map.point.red,
    size: [number, number] = [
      SizeTool.map.point.normal.width,
      SizeTool.map.point.normal.height,
    ]
  ) {
    this.path = path;
    this.size = size;
  }

  private is = {
    selected: false,
    hover: false,
  };

  private get icon() {
    if (typeof this.path == 'string') {
      return this.path;
    }
    if (this.is.selected) {
      if (this.is.hover) {
        return this.path.hover;
      }
      return this.path.normal;
    }
    if (this.is.hover) {
      return this.path.hover;
    }
    return this.path.normal;
  }

  private _get = {
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

  get() {
    return this._get.icon();
  }
  set = {
    path: (path: string | IMapMarkerPath) => {
      this.path = path;
    },
    size: (size: [number, number]) => {
      this.size = size;
    },
  };

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
