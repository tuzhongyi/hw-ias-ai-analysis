import { EventEmitter, Injectable } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import {
  SystemMapSourceTableShopFrom,
  SystemMapSourceTableShopItem,
} from '../../../system-map-source-table-shop/system-map-source-table-shop.model';
import { SystemMapPanel } from '../../system-map.model';
import { SystemMapPanelDetailsController } from './details/system-map-panel-details.controller';

@Injectable()
export class SystemMapPanelSourceShopController extends SystemMapPanel {
  select = new EventEmitter<IShop>();
  hover = new EventEmitter<IShop>();
  out = new EventEmitter<IShop>();
  position = new EventEmitter<IShop>();

  constructor(private panel: SystemMapPanelDetailsController) {
    super();
  }

  ondetails(data: IShop) {
    switch (data.ObjectState) {
      case ShopObjectState.Disappeared:
        this.panel.shop.show = false;
        break;
      case ShopObjectState.Created:
        this.panel.registration.show = false;
        break;

      default:
        break;
    }

    if (data instanceof Shop) {
      this.details.task(data);
    } else if (data instanceof ShopRegistration) {
      this.details.registration(data);
    } else if (data instanceof SystemMapSourceTableShopItem) {
      switch (data.from) {
        case SystemMapSourceTableShopFrom.task:
          this.details.task(data as unknown as Shop);
          break;
        case SystemMapSourceTableShopFrom.registration:
          this.details.registration(data as ShopRegistration);
          break;
        default:
          throw new Error('Unknown data type');
      }
    }
  }

  private details = {
    task: (data: Shop) => {
      this.panel.shop.data = data;
      this.panel.shop.show = true;
      let compared = this.panel.registration.datas.find(
        (x) => x.Shop?.Id === data.Id
      );
      if (compared) {
        this.panel.registration.data = compared.ShopRegistration;
        this.panel.registration.show = true;
      }
      this.select.emit(data);
    },
    registration: (data: ShopRegistration) => {
      this.panel.registration.data = data;
      this.panel.registration.show = true;
      this.select.emit(data);
    },
  };

  onmouseover(data: IShop) {
    this.hover.emit(data);
  }
  onmouseout(data: IShop) {
    this.out.emit(data);
  }
  onselect(data: IShop) {
    if (data instanceof Shop) {
      this.toselect.task(data);
    } else if (data instanceof ShopRegistration) {
      this.toselect.registration(data);
    } else if (data instanceof SystemMapSourceTableShopItem) {
      switch (data.from) {
        case SystemMapSourceTableShopFrom.task:
          this.toselect.task(data as unknown as Shop);
          break;
        case SystemMapSourceTableShopFrom.registration:
          this.toselect.registration(data as ShopRegistration);
          break;
        default:
          throw new Error('Unknown data type');
      }
    }
  }

  private toselect = {
    task: (data: Shop) => {
      if (this.panel.shop.show) {
        this.panel.shop.data = data;
        if (this.panel.registration.show) {
          let compared = this.panel.registration.datas.find(
            (x) => x.Shop?.Id === data.Id
          );
          if (compared) {
            this.panel.registration.data = compared.ShopRegistration;
          }
        }
        this.select.emit(data);
      }
    },
    registration: (data: IShop) => {
      if (this.panel.registration.show) {
        this.panel.registration.data = data;
        this.select.emit(data);
      }
    },
  };

  onposition(data: IShop) {
    this.position.emit(data);
  }
}
