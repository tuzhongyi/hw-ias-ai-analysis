import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { PictureComponent } from '../../../../share/picture/component/picture.component';
import { SystemEventMapComponent } from '../../system-event-map/system-event-map.component';
import { MapMarkerType } from '../../system-event-map/system-event-map.model';
import { SystemEventHandleRelateManagerComponent } from '../system-event-handle-relate-manager/system-event-handle-relate-manager.component';

@Component({
  selector: 'ias-system-event-handle-relate',
  imports: [
    CommonModule,
    FormsModule,
    PictureComponent,
    SystemEventMapComponent,
    SystemEventHandleRelateManagerComponent,
  ],
  templateUrl: './system-event-handle-relate.component.html',
  styleUrl: './system-event-handle-relate.component.less',
})
export class SystemEventHandleRelateComponent {
  @Input() data?: Shop;
  @Output() cancel = new EventEmitter<void>();
  @Output() ok = new EventEmitter<ShopRegistration>();

  constructor(private toastr: ToastrService) {}

  selected?: ShopRegistration;
  map = {
    type: MapMarkerType.shop,
  };

  onok() {
    if (this.selected) {
      this.ok.emit(this.selected);
    } else {
      this.toastr.error('请选择关联的注册商户');
    }
  }
  oncancel() {
    this.cancel.emit();
  }
}
