import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PictureComponent } from '../../share/picture/picture.component';
import { ShopModel } from '../system-module-shop-table/system-module-shop-table.model';

@Component({
  selector: 'ias-system-module-shop-list-item',
  imports: [CommonModule, PictureComponent],
  templateUrl: './system-module-shop-list-item.component.html',
  styleUrl: './system-module-shop-list-item.component.less',
})
export class SystemModuleShopListItemComponent {
  @Input() data?: ShopModel;
}
