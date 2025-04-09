import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemAMapShopPointCreatedController } from './system-map-amap-shop-point-created.controller';
import { SystemAMapShopPointDisappearedController } from './system-map-amap-shop-point-disappeared.controller';
import { SystemAMapShopPointExistedController } from './system-map-amap-shop-point-existed.controller';

export class SystemAMapShopPointLayerController {
  constructor(private container: Loca.Container) {
    this.created = new SystemAMapShopPointCreatedController(container);
    this.disappeared = new SystemAMapShopPointDisappearedController(container);
    this.existed = new SystemAMapShopPointExistedController(container);
  }

  private created: SystemAMapShopPointCreatedController;
  private disappeared: SystemAMapShopPointDisappearedController;
  private existed: SystemAMapShopPointExistedController;

  async load(datas: IShop[]) {
    let point = {
      created: datas.filter((x) => x.ObjectState === ShopObjectState.Created),
      disappeared: datas.filter(
        (x) => x.ObjectState === ShopObjectState.Disappeared
      ),
      existed: datas.filter((x) => x.ObjectState === ShopObjectState.Existed),
    };

    if (point.created.length > 0) {
      this.created.load(point.created);
    }
    if (point.disappeared.length > 0) {
      this.disappeared.load(point.disappeared);
    }
    if (point.existed.length > 0) {
      this.existed.load(point.existed);
    }
  }

  clear() {
    this.container.clear();
  }

  moving(position: [number, number]) {
    this.created.moving(position);
    this.disappeared.moving(position);
    this.existed.moving(position);
  }
}
