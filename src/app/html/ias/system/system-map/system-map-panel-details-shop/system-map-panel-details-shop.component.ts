import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Shop } from '../../../../../common/data-core/models/arm/analysis/shop.model';
import { AnalysisTask } from '../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { Language } from '../../../../../common/tools/language-tool/language';
import { ShopConverter } from '../../../../../common/view-models/shop/shop.converter';
import { ShopViewModel } from '../../../../../common/view-models/shop/shop.view-model';
import { PictureComponent } from '../../../share/picture/component/picture.component';
import { SystemMapPanelDetailsShopBusiness } from './system-map-panel-details-shop.business';

@Component({
  selector: 'ias-system-map-panel-details-shop',
  imports: [CommonModule, PictureComponent],
  templateUrl: './system-map-panel-details-shop.component.html',
  styleUrl: './system-map-panel-details-shop.component.less',
  providers: [SystemMapPanelDetailsShopBusiness],
})
export class SystemMapPanelDetailsShopComponent implements OnChanges {
  @Input('data') shop?: Shop;
  @Output() close = new EventEmitter<void>();
  @Output() picture = new EventEmitter<Shop>();
  @Output() sign = new EventEmitter<Shop>();

  constructor(
    private converter: ShopConverter,
    private business: SystemMapPanelDetailsShopBusiness
  ) {}

  data?: ShopViewModel;
  task?: AnalysisTask[];

  Language = Language;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['shop']) {
      if (this.shop) {
        this.load(this.shop);
      }
    }
  }

  load(shop: Shop) {
    this.task = [];
    this.data = this.converter.convert(shop) as ShopViewModel;
    if (shop.TaskIds && shop.TaskIds.length > 0) {
      this.business.task(shop.TaskIds).then((x) => {
        this.task = x;
      });
    }
  }

  onclose() {
    this.close.emit();
  }
  onpicture() {
    this.picture.emit(this.data);
  }
  onsign() {
    this.sign.emit(this.data);
  }
}
