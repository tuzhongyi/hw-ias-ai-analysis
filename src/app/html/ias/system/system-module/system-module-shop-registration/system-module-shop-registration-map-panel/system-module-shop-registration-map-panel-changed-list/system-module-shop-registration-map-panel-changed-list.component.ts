import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShopRegistration } from '../../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemModuleShopRegistrationMapPanelChangedTableComponent } from '../system-module-shop-registration-map-panel-changed-table/system-module-shop-registration-map-panel-changed-table.component';
import { SystemModuleShopRegistrationMapPanelChangedListBusiness } from './system-module-shop-registration-map-panel-changed-list.business';

@Component({
  selector: 'ias-system-module-shop-registration-map-panel-changed-list',
  imports: [SystemModuleShopRegistrationMapPanelChangedTableComponent],
  templateUrl:
    './system-module-shop-registration-map-panel-changed-list.component.html',
  styleUrl:
    './system-module-shop-registration-map-panel-changed-list.component.less',
  providers: [SystemModuleShopRegistrationMapPanelChangedListBusiness],
})
export class SystemModuleShopRegistrationMapPanelChangedListComponent {
  @Input() datas: ShopRegistration[] = [];
  @Output() datasChange = new EventEmitter<ShopRegistration[]>();

  @Input() selected?: ShopRegistration;
  @Output() selectedChange = new EventEmitter<ShopRegistration>();

  @Output() revoke = new EventEmitter<ShopRegistration>();
  @Output() position = new EventEmitter<ShopRegistration>();
  @Output() itemhover = new EventEmitter<ShopRegistration>();
  @Output() itemblur = new EventEmitter<ShopRegistration>();
  @Output() saved = new EventEmitter<ShopRegistration[]>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private business: SystemModuleShopRegistrationMapPanelChangedListBusiness,
    private toastr: ToastrService
  ) {}

  on = {
    cancel: () => {
      this.cancel.emit();
    },
    save: () => {
      this.business
        .save(this.datas)
        .then((result) => {
          this.toastr.success(`已成功保存${result.length}个商铺坐标`);
          if (result.length === this.datas.length) {
            this.saved.emit(this.datas);
          }
        })
        .catch((result) => {
          this.toastr.error(`保存失败，${result.length}个商铺坐标未保存`);
          console.error(result);
        });
    },
    table: {
      position: (item: ShopRegistration) => {
        this.position.emit(item);
      },
      revoke: (item: ShopRegistration) => {
        this.revoke.emit(item);
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
