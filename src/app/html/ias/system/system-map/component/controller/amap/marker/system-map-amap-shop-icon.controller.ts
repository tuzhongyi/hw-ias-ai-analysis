import { ShopObjectState } from '../../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';

export class SystemAMapShopIconController {
  private size(selected = false): [number, number] {
    let width = 66;
    let height = 86;

    if (selected) {
      return [76 * 0.7, 95 * 0.7];
    }

    return [width * 0.7, height * 0.7];
  }

  private get opts(): AMap.LabelMarkerIconOptions {
    let icon = {
      type: 'image',
      image: '/assets/image/map/marker/marker-shop-white.png',
      size: this.size(),
      anchor: 'bottom-center',
    };
    return icon;
  }

  get created() {
    return {
      normal: {
        ...this.opts,
        image: '/assets/image/map/marker/marker-shop-green.png',
      },
      hover: {
        ...this.opts,
        image: '/assets/image/map/marker/marker-shop-green-hover.png',
      },
      selected: {
        ...this.opts,
        size: this.size(true),
        image: '/assets/image/map/marker/marker-shop-green-selected.png',
      },
    };
  }
  get disappeared() {
    return {
      normal: {
        ...this.opts,
        image: '/assets/image/map/marker/marker-shop-orange.png',
      },
      hover: {
        ...this.opts,
        image: '/assets/image/map/marker/marker-shop-orange-hover.png',
      },
      selected: {
        ...this.opts,
        size: this.size(true),
        image: '/assets/image/map/marker/marker-shop-orange-selected.png',
      },
    };
  }
  get existed() {
    return {
      normal: {
        ...this.opts,
        image: '/assets/image/map/marker/marker-shop-blue.png',
      },
      hover: {
        ...this.opts,
        image: '/assets/image/map/marker/marker-shop-blue-hover.png',
      },
      selected: {
        ...this.opts,
        size: this.size(true),
        image: '/assets/image/map/marker/marker-shop-blue-selected.png',
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
