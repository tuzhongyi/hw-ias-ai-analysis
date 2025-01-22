import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShopViewModel } from '../../../../common/view-models/shop/shop.view-model';
import { PictureComponent } from '../../share/picture/picture.component';

@Component({
  selector: 'ias-system-module-shop-list-item',
  imports: [CommonModule, PictureComponent],
  templateUrl: './system-module-shop-list-item.component.html',
  styleUrl: './system-module-shop-list-item.component.less',
})
export class SystemModuleShopListItemComponent {
  @Input() data?: ShopViewModel;
}
