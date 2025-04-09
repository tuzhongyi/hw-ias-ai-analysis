import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowComponent } from '../../../../../../common/components/window-control/window.component';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { PictureWindowContentComponent } from '../../../../share/picture-window-content/picture-window-content.component';
import { SystemModuleShopDetailsInfoComponent } from '../system-module-shop-details-info/system-module-shop-details-info.component';
import { SystemModuleShopDetailsMapComponent } from '../system-module-shop-details-map/system-module-shop-details-map.component';
import { SystemModuleShopSignTableComponent } from '../system-module-shop-sign-table/system-module-shop-sign-table.component';
import { SystemModuleShopDetailsBusiness } from './system-module-shop-details.business';
import { SystemModuleShopDetailsWindow } from './system-module-shop-details.window';

@Component({
  selector: 'ias-system-module-shop-details',
  templateUrl: './system-module-shop-details.component.html',
  styleUrl: './system-module-shop-details.component.less',
  imports: [
    CommonModule,
    ContentHeaderComponent,
    WindowComponent,
    PictureWindowContentComponent,
    SystemModuleShopDetailsInfoComponent,
    SystemModuleShopSignTableComponent,
    SystemModuleShopDetailsMapComponent,
  ],
  providers: [SystemModuleShopDetailsBusiness],
})
export class SystemModuleShopDetailsComponent implements OnInit {
  @Input() data?: ShopViewModel;
  @Output() ok = new EventEmitter<Shop>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private business: SystemModuleShopDetailsBusiness,
    private toastr: ToastrService
  ) {}

  shop = new Shop();
  sign?: ShopSign;
  window = new SystemModuleShopDetailsWindow();

  ngOnInit(): void {
    if (this.data) {
      this.shop = Object.assign(this.shop, this.data);
    }
  }

  onposition(data: GisPoint) {
    if (this.shop) {
      this.shop.Location = data;
    }
  }

  onok() {
    if (this.shop) {
      this.business
        .update(this.shop)
        .then((x) => {
          this.toastr.success('操作成功');
          this.ok.emit(this.data);
        })
        .catch((e) => {
          this.toastr.error('操作失败');
        });
    }
  }
  oncancel() {
    this.cancel.emit();
  }

  onerror(e: Error) {
    this.toastr.error(e.message);
  }
  onpicture(data: ShopSign) {
    this.window.picture.id = data.ImageUrl;
    this.window.picture.title = data.Text ?? '';
    this.window.picture.polygon = data.Polygon ?? [];
    this.window.picture.show = true;
  }
}
