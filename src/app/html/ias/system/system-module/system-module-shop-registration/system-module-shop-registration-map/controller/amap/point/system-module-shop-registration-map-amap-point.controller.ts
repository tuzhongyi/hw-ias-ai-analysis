import { EventEmitter } from '@angular/core';
import { IShop } from '../../../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { SystemAMapShopPointExistedController } from '../../../../../../system-map/component/controller/amap/point/system-map-amap-shop-point-existed.controller';

export class SystemModuleShopRegistrationMapAMapPointController {
  event = {
    move: new EventEmitter<[number, number]>(),
  };

  constructor(private container: Loca.Container) {
    this.existed = new SystemAMapShopPointExistedController(container);
    this.regist();
  }

  private existed: SystemAMapShopPointExistedController;

  private regist() {
    this.existed.event.move.subscribe((position) => {
      this.event.move.emit(position);
    });
  }

  load(datas: IShop[]) {
    if (datas.length > 0) {
      this.existed.load(datas);
    }
  }

  clear() {
    this.container.clear();
  }

  moving(position: [number, number]) {
    this.existed.moving(position);
  }
}
