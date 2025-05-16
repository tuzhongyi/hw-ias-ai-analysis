import { MapMarkerType } from '../../system-event-map.model';

export class SystemEventMapAMapIconController {
  private type = MapMarkerType.other;
  private is = {
    selected: false,
    hover: false,
  };

  private get icon() {
    let _default = '/assets/image/map/marker-red.png';

    switch (this.type) {
      case MapMarkerType.shop:
        if (this.is.selected) {
          if (this.is.hover) {
            return '/assets/image/map/marker/marker-shop-green-hover.png';
          }
          return '/assets/image/map/marker/marker-shop-green.png';
        }
        if (this.is.hover) {
          return '/assets/image/map/marker/marker-shop-blue-hover.png';
        }
        return '/assets/image/map/marker/marker-shop-blue.png';
      default:
        return _default;
    }
  }
  private get size(): [number, number] {
    let _default: [number, number] = [51 * 0.7, 70 * 0.7];
    switch (this.type) {
      case MapMarkerType.shop:
        return [66 * 0.7, 86 * 0.7];
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

  get(type: MapMarkerType) {
    this.type = type;
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
