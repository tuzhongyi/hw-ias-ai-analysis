import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Shop } from '../../../../../../common/data-core/models/arm/analysis/shop.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { IASMapComponent } from '../../../../share/map/ias-map.component';

import { PathTool } from '../../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../../common/tools/size-tool/size.tool';
import { PictureComponent } from '../../../../share/picture/component/picture.component';
import { SystemEventHandleRelateManagerComponent } from '../system-event-handle-relate-manager/system-event-handle-relate-manager.component';

@Component({
  selector: 'ias-system-event-handle-relate',
  imports: [
    CommonModule,
    FormsModule,
    PictureComponent,
    IASMapComponent,
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
    marker: {
      path: PathTool.image.map.shop.blue,
      size: SizeTool.map.shop.get(),
    },
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
