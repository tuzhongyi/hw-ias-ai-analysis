import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ShopRegistration } from '../../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemAMapShopPointCreatedController } from '../../../../../../system-map/component/controller/amap/point/system-map-amap-shop-point-created.controller';
import { SystemAMapShopPointDisappearedController } from '../../../../../../system-map/component/controller/amap/point/system-map-amap-shop-point-disappeared.controller';
import { SystemAMapShopPointExistedController } from '../../../../../../system-map/component/controller/amap/point/system-map-amap-shop-point-existed.controller';

export class SystemTaskRouteMapAMapPointController {
  event = {
    move: new EventEmitter<IShop>(),
  };

  constructor(private container: Loca.Container) {
    this.created = new SystemAMapShopPointCreatedController(container);
    this.disappeared = new SystemAMapShopPointDisappearedController(container);
    this.existed = new SystemAMapShopPointExistedController(container);
    this.regist();
  }

  private created: SystemAMapShopPointCreatedController;
  private disappeared: SystemAMapShopPointDisappearedController;
  private existed: SystemAMapShopPointExistedController;

  private regist() {
    this.created.event.move.subscribe((data) => {
      this.event.move.emit(data as IShop);
    });
    this.disappeared.event.move.subscribe((data) => {
      this.event.move.emit(data as IShop);
    });
    this.existed.event.move.subscribe((data) => {
      this.event.move.emit(data as IShop);
    });
  }

  load(datas: {
    created: IShop[];
    disappeared: ShopRegistration[];
    existed: ShopRegistration[];
  }) {
    if (datas.created.length > 0) {
      this.created.load(datas.created);
    }
    if (datas.disappeared.length > 0) {
      this.disappeared.load(datas.disappeared);
    }
    if (datas.existed.length > 0) {
      this.existed.load(datas.existed);
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
