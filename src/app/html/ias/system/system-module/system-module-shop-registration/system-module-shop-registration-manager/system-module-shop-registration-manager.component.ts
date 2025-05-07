import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadControlComponent } from '../../../../../../common/components/upload-control/upload-control.component';
import {
  FileReadType,
  UploadControlFile,
} from '../../../../../../common/components/upload-control/upload-control.model';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { WindowComponent } from '../../../../../../common/components/window-control/window.component';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/analysis/shop-registration.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { InputSelectRoadComponent } from '../../../../share/input-select-road/input-select-road.component';
import { PictureWindowContentPageComponent } from '../../../../share/picture-window-content-page/picture-window-content-page.component';
import { SystemModuleShopRegistrationInformationComponent } from '../system-module-shop-registration-information/system-module-shop-registration-information.component';
import { SystemModuleShopRegistrationTableComponent } from '../system-module-shop-registration-table/system-module-shop-registration-table.component';
import { SystemModuleShopRegistrationTableArgs } from '../system-module-shop-registration-table/system-module-shop-registration-table.model';
import { SystemModuleShopRegistrationManagerBusiness } from './system-module-shop-registration-manager.business';
import { SystemModuleShopRegistrationManagerWindow } from './system-module-shop-registration-manager.window';

@Component({
  selector: 'ias-system-module-shop-registration-manager',
  imports: [
    CommonModule,
    FormsModule,
    InputSelectRoadComponent,
    SystemModuleShopRegistrationTableComponent,
    SystemModuleShopRegistrationInformationComponent,
    PictureWindowContentPageComponent,

    UploadControlComponent,
    WindowConfirmComponent,
    WindowComponent,
  ],
  templateUrl: './system-module-shop-registration-manager.component.html',
  styleUrl: './system-module-shop-registration-manager.component.less',
  providers: [SystemModuleShopRegistrationManagerBusiness],
})
export class SystemModuleShopRegistrationManagerComponent {
  constructor(
    private business: SystemModuleShopRegistrationManagerBusiness,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleShopRegistrationManagerWindow();

  table = {
    args: new SystemModuleShopRegistrationTableArgs(),
    load: new EventEmitter<SystemModuleShopRegistrationTableArgs>(),
    selecteds: [] as ShopRegistration[],
    picture: {
      page: new EventEmitter<number>(),
      on: (paged: Paged<ShopRegistration>) => {
        this.window.picture.page = paged.Page;
        this.window.picture.id = paged.Data.ImageUrl;
        this.window.picture.title = paged.Data.Name;
        this.window.picture.show = true;
      },
      change: (page: Page) => {
        this.table.picture.page.emit(page.PageIndex);
      },
    },
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };

  create = {
    open: () => {
      this.window.create.clear();
      this.window.create.show = true;
    },
    ok: () => {
      this.window.create.show = false;
    },
  };
  info = {
    open: (shop: ShopRegistration) => {
      this.window.create.data = shop;
      this.window.create.show = true;
    },
  };
  delete = {
    on: () => {
      if (this.table.selecteds.length > 0) {
        this.window.confirm.show = true;
      }
    },
    to: () => {
      let ids = this.table.selecteds.map((x) => x.Id);
      this.business
        .delete(ids)
        .then((x) => {
          this.toastr.success('删除成功');
          this.table.selecteds = [];
          this.table.load.emit(this.table.args);
        })
        .catch((x) => {
          this.toastr.error('删除失败');
        })
        .then(() => {
          this.window.confirm.show = false;
        });
    },
  };
  upload = {
    accept: '*.*',
    type: FileReadType.ArrayBuffer,
    do: (file: UploadControlFile) => {
      this.business.upload(file.data as ArrayBuffer).then((x) => {
        this.toastr.success('导入成功');
        this.table.selecteds = [];
        this.table.load.emit(this.table.args);
      });
    },
  };
}
