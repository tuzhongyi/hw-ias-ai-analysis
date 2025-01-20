import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shop } from '../../../../common/data-core/models/arm/analysis/shop.model';
import { Language } from '../../../../common/tools/language';
import { PictureComponent } from '../../share/picture/picture.component';
import { SystemMapPanelHeadComponent } from '../system-map-panel-head/system-map-panel-head.component';

@Component({
  selector: 'ias-system-map-panel-details-shop',
  imports: [CommonModule, SystemMapPanelHeadComponent, PictureComponent],
  templateUrl: './system-map-panel-details-shop.component.html',
  styleUrl: './system-map-panel-details-shop.component.less',
})
export class SystemMapPanelDetailsShopComponent {
  @Input() data?: Shop;
  @Output() close = new EventEmitter<void>();

  Language = Language;

  onclose() {
    this.close.emit();
  }
}
