import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';
import { PicturePolygonZoomComponent } from '../../../../share/picture/picture-polygon-zoom/picture-polygon-zoom.component';

@Component({
  selector: 'ias-system-module-shop-details-info',
  imports: [
    CommonModule,
    FormsModule,
    PicturePolygonZoomComponent,
    TextSpaceBetweenDirective,
  ],
  templateUrl: './system-module-shop-details-info.component.html',
  styleUrl: './system-module-shop-details-info.component.less',
  providers: [],
})
export class SystemModuleShopDetailsInfoComponent {
  @Input() data?: ShopViewModel;
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
