import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';

@Component({
  selector: 'ias-system-event-process-shop-info',
  imports: [CommonModule],
  templateUrl: './system-event-process-shop-info.component.html',
  styleUrl: './system-event-process-shop-info.component.less',
})
export class SystemEventProcessShopInfoComponent implements OnChanges {
  @Input() data?: ShopRegistration;

  constructor(private language: LanguageTool) {}

  state = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.language.analysis.shop
        .BusinessState(this.data.BusinessState, '-')
        .then((x) => {
          this.state = x;
        });
    }
  }
}
