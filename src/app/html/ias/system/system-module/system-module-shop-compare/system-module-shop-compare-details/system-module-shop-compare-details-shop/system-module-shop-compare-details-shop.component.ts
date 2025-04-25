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
import { IShop } from '../../../../../../../common/data-core/models/arm/analysis/shop.interface';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { Language } from '../../../../../../../common/tools/language';
import { ShopConverter } from '../../../../../../../common/view-models/shop/shop.converter';
import { ShopViewModel } from '../../../../../../../common/view-models/shop/shop.view-model';
import { PictureComponent } from '../../../../../share/picture/picture.component';

@Component({
  selector: 'ias-system-module-shop-compare-details-shop',
  imports: [CommonModule, PictureComponent],
  templateUrl: './system-module-shop-compare-details-shop.component.html',
  styleUrl: './system-module-shop-compare-details-shop.component.less',
})
export class SystemModuleShopCompareDetailsShopComponent implements OnChanges {
  @Input() data?: Shop;
  @Output() picture = new EventEmitter<IShop>();

  constructor(private converter: ShopConverter) {}

  shop?: ShopViewModel;

  Language = Language;

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }
  private change = {
    data: (simple: SimpleChange) => {
      if (simple && this.data) {
        this.shop = this.converter.convert(this.data) as ShopViewModel;
      }
    },
  };

  onpicture() {
    this.picture.emit(this.data);
  }
}
