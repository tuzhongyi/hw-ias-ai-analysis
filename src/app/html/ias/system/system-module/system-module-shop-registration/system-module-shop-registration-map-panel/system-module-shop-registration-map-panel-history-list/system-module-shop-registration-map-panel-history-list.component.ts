import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemModuleShopRegistrationMapPanelHistoryTableComponent } from '../system-module-shop-registration-map-panel-history-table/system-module-shop-registration-map-panel-history-table.component';
import { SystemModuleShopRegistrationMapPanelHistoryListBusiness } from './system-module-shop-registration-map-panel-history-list.business';

@Component({
  selector: 'ias-system-module-shop-registration-map-panel-history-list',
  imports: [SystemModuleShopRegistrationMapPanelHistoryTableComponent],
  templateUrl:
    './system-module-shop-registration-map-panel-history-list.component.html',
  styleUrl:
    './system-module-shop-registration-map-panel-history-list.component.less',
  providers: [SystemModuleShopRegistrationMapPanelHistoryListBusiness],
})
export class SystemModuleShopRegistrationMapPanelHistoryListComponent {
  @Input() title = '历史记录';
  @Input() datas: ShopRegistration[] = [];
  @Output() datasChange = new EventEmitter<ShopRegistration[]>();

  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();

  @Input() draggable?: boolean;
  @Input() removable?: boolean;

  @Output() remove = new EventEmitter<ShopRegistration>();
  @Output() position = new EventEmitter<ShopRegistration>();
  @Output() itemhover = new EventEmitter<ShopRegistration>();
  @Output() itemblur = new EventEmitter<ShopRegistration>();
  @Output() saved = new EventEmitter<ShopRegistration[]>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private business: SystemModuleShopRegistrationMapPanelHistoryListBusiness,
    private toastr: ToastrService
  ) {}

  on = {
    cancel: () => {
      this.cancel.emit();
    },
    save: () => {
      this.business
        .save(this.datas, {
          draggable: this.draggable,
          removable: this.removable,
        })
        .then((result) => {
          this.toastr.success(`保存成功`);
          if (result.length === this.datas.length) {
            this.saved.emit(this.datas);
          }
        })
        .catch((error) => {
          this.toastr.error(error.message, '保存失败');
          console.error(error);
        });
    },
    table: {
      position: (item: ShopRegistration) => {
        this.position.emit(item);
      },
      remove: (item: ShopRegistration) => {
        this.remove.emit(item);
      },
      selected: {
        change: (item: ShopRegistration) => {
          this.selected = item;
          this.selectedChange.emit(item);
        },
      },
      item: {
        hover: (item: ShopRegistration) => {
          this.itemhover.emit(item);
        },
        blur: (item: ShopRegistration) => {
          this.itemblur.emit(item);
        },
      },
    },
  };
}
