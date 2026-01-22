import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { ILocation } from '../../../../../../../../common/data-core/models/model.interface';
import { IASMapAMapPointExistedController } from '../../../../../../share/map/controller/amap/shop/point/ias-map-amap-shop-point-existed.controller';

export class SystemModuleShopDetailsAMapPointController {
  event = {
    move: new EventEmitter<ILocation>(),
  };

  constructor(private container: Loca.Container) {
    this.existed = new IASMapAMapPointExistedController(container);
    this.regist();
  }

  private existed: IASMapAMapPointExistedController;

  private regist() {
    this.existed.event.move.subscribe((data) => {
      this.event.move.emit(data);
    });
  }

  load(datas: IShop[]) {
    if (datas.length > 0) {
      this.existed.load(datas, { zooms: [0, 50] });
    }
  }

  clear() {
    this.container.clear();
  }

  moving(position: [number, number]) {
    this.existed.moving(position);
  }
}
