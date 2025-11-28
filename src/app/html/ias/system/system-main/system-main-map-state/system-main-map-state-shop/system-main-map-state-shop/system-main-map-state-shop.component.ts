import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemMainMapStateShopItemComponent } from '../system-main-map-state-shop-item/system-main-map-state-shop-item.component';
import { SystemMainMapStateShopItem } from '../system-main-map-state-shop-item/system-main-map-state-shop-item.model';
import { SystemMainMapStateShopBusiness } from './system-main-map-state-shop.business';

@Component({
  selector: 'ias-system-main-map-state-shop',
  imports: [CommonModule, SystemMainMapStateShopItemComponent],
  templateUrl: './system-main-map-state-shop.component.html',
  styleUrl: './system-main-map-state-shop.component.less',
  providers: [SystemMainMapStateShopBusiness],
})
export class SystemMainMapStateShopComponent implements OnChanges {
  @Input('datas') shops: ShopRegistration[] = [];
  @Input() selected: ShopObjectState[] = [];
  @Output() selectedChange = new EventEmitter<ShopObjectState[]>();

  constructor(private business: SystemMainMapStateShopBusiness) {}

  datas: SystemMainMapStateShopItem[] = [];

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple) {
        this.load(this.shops);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['shops']);
  }

  private async load(datas: ShopRegistration[]) {
    this.datas = await this.business.load(datas);
  }

  on = {
    select: (item: ShopObjectState) => {
      let index = this.selected.indexOf(item);
      if (index > -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(item);
      }
      this.selectedChange.emit(this.selected);
    },
  };
}
