import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { ShopModel } from '../system-module-shop-table/system-module-shop-table.model';
import { SystemModuleShopSignTableBusiness } from './system-module-shop-sign-table.business';

@Component({
  selector: 'ias-system-module-shop-sign-table',
  imports: [CommonModule],
  templateUrl: './system-module-shop-sign-table.component.html',
  styleUrl: './system-module-shop-sign-table.component.less',
  providers: [SystemModuleShopSignTableBusiness],
})
export class SystemModuleShopSignTableComponent implements OnInit {
  @Input('data') shop?: ShopModel;
  @Input() selected?: ShopSign;
  @Output() selectedChange = new EventEmitter<ShopSign>();

  constructor(private business: SystemModuleShopSignTableBusiness) {}

  datas: ShopSign[] = [];
  widths: string[] = ['15%', 'auto', '20%'];

  ngOnInit(): void {
    if (this.shop) {
      this.load(this.shop.Id);
    }
  }

  private load(id: string) {
    this.business.load(id).then((x) => {
      this.datas = x;
      if (this.datas.length > 0) {
        this.onselect(this.datas[0]);
      }
    });
  }

  onselect(item: ShopSign) {
    if (this.selected === item) {
      return;
    }
    this.selected = item;
    this.selectedChange.emit(item);
  }
}
