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
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { InputSelectRoadComponent } from '../../../../share/input-select-road/input-select-road.component';
import { IASMapComponent } from '../../../../share/map/ias-map.component';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemModuleShopRegistrationDownloadManagerComponent } from '../system-module-shop-registration-download-manager/system-module-shop-registration-download-manager.component';
import { SystemModuleShopRegistrationInformationComponent } from '../system-module-shop-registration-information/system-module-shop-registration-information.component';
import { SystemModuleShopRegistrationMapManagerComponent } from '../system-module-shop-registration-map-manager/system-module-shop-registration-map-manager.component';
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
    UploadControlComponent,
    WindowConfirmComponent,
    WindowComponent,
    PictureListComponent,
    IASMapComponent,
    SystemModuleShopRegistrationMapManagerComponent,
    SystemModuleShopRegistrationDownloadManagerComponent,
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
  datas: ShopRegistration[] = [];

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
    loaded: (datas: ShopRegistration[]) => {
      this.datas = datas;
      this.map.load(datas);
    },
  };

  create = {
    open: () => {
      this.window.information.clear();
      this.window.information.show = true;
    },
    ok: () => {
      this.window.information.show = false;
    },
  };
  info = {
    open: (shop: ShopRegistration) => {
      this.window.information.data = shop;
      this.window.information.show = true;
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
  file = {
    download: () => {},
    upload: {
      accept: '*.*',
      type: FileReadType.ArrayBuffer,
      name: '文件上传',
      loading: false,
      do: (file: UploadControlFile) => {
        this.toastr.success('开始上传文件，请稍候...');
        this.file.upload.loading = true;
        this.business
          .upload(file.data as ArrayBuffer, (value: number) => {
            this.file.upload.name = `${value.toFixed(0)}%`;
          })
          .then((x) => {
            this.toastr.success('上传成功');
            this.table.selecteds = [];
            this.table.load.emit(this.table.args);
          })
          .catch((e) => {
            this.toastr.error('上传失败');
          })
          .finally(() => {
            this.file.upload.loading = false;
            this.file.upload.name = '文件上传';
          });
      },
    },
  };

  map = {
    points: [] as GisPoint[],
    load: (datas: ShopRegistration[]) => {
      this.map.points = datas.filter((x) => x.Location).map((x) => x.Location!);
    },
  };

  location = {
    changed: [] as ShopRegistration[],
    on: () => {
      this.window.map.show = true;
    },
    close: () => {
      if (this.location.changed.length > 0) {
      }
    },
  };
  on = {
    download: () => {
      this.window.download.show = true;
    },
  };
}
