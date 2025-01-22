import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Language } from '../../../../common/tools/language';
import { ShopConverter } from '../../../../common/view-models/shop/shop.converter';
import { ShopViewModel } from '../../../../common/view-models/shop/shop.view-model';
import { PictureComponent } from '../../share/picture/picture.component';

@Component({
  selector: 'ias-system-map-panel-details-shop',
  imports: [CommonModule, PictureComponent],
  templateUrl: './system-map-panel-details-shop.component.html',
  styleUrl: './system-map-panel-details-shop.component.less',
})
export class SystemMapPanelDetailsShopComponent implements OnChanges {
  @Input('data') shop?: Shop;
  @Output() close = new EventEmitter<void>();

  constructor(private converter: ShopConverter) {}

  data?: ShopViewModel;

  Language = Language;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shop']) {
      if (this.shop) {
        this.data = this.converter.convert(this.shop);
      }
    }
  }

  onclose() {
    this.close.emit();
  }
}
