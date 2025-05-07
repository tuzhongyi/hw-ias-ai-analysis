import { Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { SystemMapController } from '../controller/system-map.controller';

@Injectable()
export class SystemMapAMapTrigger {
  constructor(private controller: SystemMapController) {
    this.regist();
  }

  private get panel() {
    return this.controller.panel;
  }
  private get amap() {
    return this.controller.amap;
  }

  init() {}

  private regist() {
    this.amap.event.point.click.subscribe((data) => {
      if (data instanceof Shop) {
        this.panel.details.analysis.data = data;
        this.panel.details.analysis.show = true;
        if (data.ObjectState === ShopObjectState.Created) {
          this.panel.details.registration.show = false;
        } else if (data.ObjectState === ShopObjectState.Existed) {
          let compare = this.panel.details.registration.datas.find(
            (x) => x.Shop?.Id === data.Id
          );
          if (compare && compare.ShopRegistration) {
            this.panel.details.registration.data = compare.ShopRegistration;
            this.panel.details.registration.show = true;
          }
        }
      }
      if (data instanceof ShopRegistration) {
        this.panel.details.registration.data = data;
        this.panel.details.registration.show = true;
        if (this.panel.details.analysis.show) {
          if (data.ObjectState === ShopObjectState.Disappeared) {
            this.panel.details.analysis.show = false;
          }
        }
      }
    });
    this.amap.event.map.mousemmove.subscribe((x) => {
      if (!this.panel.position.show) {
        this.panel.position.show = true;
      }
      this.panel.position.point.X = x[0];
      this.panel.position.point.Y = x[1];
    });
  }
}
