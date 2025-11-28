import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SystemMainMapStateShopItem } from './system-main-map-state-shop-item.model';

@Component({
  selector: 'ias-system-main-map-state-shop-item',
  imports: [CommonModule],
  templateUrl: './system-main-map-state-shop-item.component.html',
  styleUrl: './system-main-map-state-shop-item.component.less',
})
export class SystemMainMapStateShopItemComponent {
  @Input() data = new SystemMainMapStateShopItem();
}
