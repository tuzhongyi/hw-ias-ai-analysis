import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Shop } from '../../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';

@Component({
  selector: 'ias-system-task-shop-analysis-details-info',
  imports: [CommonModule],
  templateUrl: './system-task-shop-analysis-details-info.component.html',
  styleUrl: './system-task-shop-analysis-details-info.component.less',
})
export class SystemTaskShopAnalysisDetailsInfoComponent implements OnChanges {
  @Input() shop?: Shop;
  @Input() registration?: ShopRegistration;

  constructor(private language: LanguageTool) {}

  info = {
    ShopType: '',
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['data']);
  }

  private change = {
    data: (data: SimpleChange) => {
      if (data) {
        if (this.shop) {
          this.language.analysis.shop
            .ShopType(this.shop.ShopType, '-')
            .then((x) => {
              this.info.ShopType = x;
            });
        }
      }
    },
  };
}
