import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { GisType } from '../../../../../../common/data-core/enums/gis-type.enum';
import { ShopSign } from '../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import {
  GisPoint,
  GisPoints,
} from '../../../../../../common/data-core/models/arm/gis-point.model';
import { ShopViewModel } from '../../../../../../common/view-models/shop/shop.view-model';
import { SystemModuleShopDetailsInfoComponent } from '../system-module-shop-details-info/system-module-shop-details-info.component';
import { SystemModuleShopDetailsMapComponent } from '../system-module-shop-details-map/system-module-shop-details-map.component';
import { SystemModuleShopSignTableComponent } from '../system-module-shop-sign-table/system-module-shop-sign-table.component';
import { SystemModuleShopDetailsBusiness } from './system-module-shop-details.business';

@Component({
  selector: 'ias-system-module-shop-details',
  templateUrl: './system-module-shop-details.component.html',
  styleUrl: './system-module-shop-details.component.less',
  imports: [
    CommonModule,
    SystemModuleShopDetailsInfoComponent,
    SystemModuleShopSignTableComponent,
    SystemModuleShopDetailsMapComponent,
  ],
  providers: [SystemModuleShopDetailsBusiness],
})
export class SystemModuleShopDetailsComponent implements OnInit {
  @Input() data?: ShopViewModel;
  @Input() change = true;
  @Output() ok = new EventEmitter<Shop>();
  @Output() cancel = new EventEmitter<void>();
  @Output() picture = new EventEmitter<ShopSign>();

  constructor(
    private business: SystemModuleShopDetailsBusiness,
    private toastr: ToastrService
  ) {}

  shop = new Shop();
  sign?: ShopSign;

  ngOnInit(): void {
    if (this.data) {
      this.shop = Object.assign(this.shop, this.data);
    }
  }

  onposition(data: GisPoint) {
    if (this.shop) {
      if (!this.shop.Location) {
        this.shop.Location = new GisPoints();
      }
      this.shop.Location.set(data, GisType.GCJ02);
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
    this.picture.emit(data);
  }
}
