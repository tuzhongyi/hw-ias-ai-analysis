import { EventEmitter } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { IASMapAMapPointCreatedController } from './ias-map-amap-point-created.controller';
import { IASMapAMapPointDisappearedController } from './ias-map-amap-point-disappeared.controller';
import { IASMapAMapPointExistedController } from './ias-map-amap-point-existed.controller';

export class IASMapAMapPointLayerController {
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
    this.created.event.move.subscribe((x) => {
      this.event.move.emit(x as IShop);
    });
    this.disappeared.event.move.subscribe((x) => {
      this.event.move.emit(x as IShop);
    });
    this.existed.event.move.subscribe((x) => {
      this.event.move.emit(x as IShop);
    });
  }

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
