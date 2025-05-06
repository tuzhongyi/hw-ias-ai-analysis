import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { ShopSignViewModel } from '../../../../../../common/view-models/shop-sign/shop-sign.view-model';
import { SystemModuleShopSignTableBusiness } from './system-module-shop-sign-table.business';

@Component({
  selector: 'ias-system-module-shop-sign-table',
  imports: [CommonModule],
  templateUrl: './system-module-shop-sign-table.component.html',
  styleUrl: './system-module-shop-sign-table.component.less',
  providers: [SystemModuleShopSignTableBusiness],
})
export class SystemModuleShopSignTableComponent implements OnInit {
  @Input('data') shop?: Shop;
  @Input() selected?: ShopSign;
  @Output() selectedChange = new EventEmitter<ShopSign>();
  @Output() error = new EventEmitter<Error>();

  constructor(private business: SystemModuleShopSignTableBusiness) {}

  datas: ShopSignViewModel[] = [];
  widths: string[] = ['65px', 'auto', '85px', '60px', '82px', '180px'];

  Language = Language;

  ngOnInit(): void {
    if (this.shop) {
      this.load(this.shop.Id);
    }
  }

  private load(id: string) {
    this.business
      .load(id)
      .then((x) => {
        this.datas = x;
        if (this.datas.length > 0) {
          this.onselect(this.datas[0]);
        }
      })
      .catch((e) => {
        this.error.emit(e);
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
