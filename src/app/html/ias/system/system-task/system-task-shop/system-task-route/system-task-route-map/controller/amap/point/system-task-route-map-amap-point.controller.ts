import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ShopRegistration } from '../../../../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { IASMapAMapPointCreatedController } from '../../../../../../../../share/map/controller/amap/point/ias-map-amap-point-created.controller';
import { IASMapAMapPointDisappearedController } from '../../../../../../../../share/map/controller/amap/point/ias-map-amap-point-disappeared.controller';
import { IASMapAMapPointExistedController } from '../../../../../../../../share/map/controller/amap/point/ias-map-amap-point-existed.controller';

export class SystemTaskRouteMapAMapPointController {
  event = {
    move: new EventEmitter<IShop>(),
  };

  constructor(private container: Loca.Container) {
    this.created = new IASMapAMapPointCreatedController(container);
    this.disappeared = new IASMapAMapPointDisappearedController(container);
    this.existed = new IASMapAMapPointExistedController(container);
    this.regist();
  }

  private created: IASMapAMapPointCreatedController;
  private disappeared: IASMapAMapPointDisappearedController;
  private existed: IASMapAMapPointExistedController;

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
