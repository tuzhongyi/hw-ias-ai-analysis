import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { TextSpaceBetweenDirective } from '../../../../common/directives/text-space-between/text-space-between.directive';
import { Language } from '../../../../common/tools/language';
import { PictureComponent } from '../../share/picture/picture.component';
import { ShopModel } from '../system-module-shop-table/system-module-shop-table.model';

@Component({
  selector: 'ias-system-module-shop-details-info',
  imports: [
    CommonModule,
    FormsModule,
    PictureComponent,
    TextSpaceBetweenDirective,
  ],
  templateUrl: './system-module-shop-details-info.component.html',
  styleUrl: './system-module-shop-details-info.component.less',
  providers: [],
})
export class SystemModuleShopDetailsInfoComponent {
  @Input() data?: ShopModel;
  @Input() sign?: ShopSign;
  @Output() picture = new EventEmitter<ShopSign>();

  Language = Language;

  onchange() {
    console.log(this.data);
  }
  onpicture() {
    if (this.sign) {
      this.picture.emit(this.sign);
    }
  }
}
