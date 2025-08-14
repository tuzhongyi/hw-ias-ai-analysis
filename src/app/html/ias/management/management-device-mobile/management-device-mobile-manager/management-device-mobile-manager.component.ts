import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadControlComponent } from '../../../../../common/components/upload-control/upload-control.component';
import {
  FileReadType,
  UploadControlFile,
} from '../../../../../common/components/upload-control/upload-control.model';
import { WindowConfirmComponent } from '../../../../../common/components/window-confirm/window-confirm.component';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { UserGroup } from '../../../../../common/data-core/models/user/user-group.model';
import { WindowComponent } from '../../../share/window/window.component';
import { ManagementDeviceMobileInformationComponent } from '../management-device-mobile-information/management-device-mobile-information.component';
import { ManagementDeviceMobileTableComponent } from '../management-device-mobile-table/management-device-mobile-table.component';
import { ManagementDeviceMobileTableArgs } from '../management-device-mobile-table/management-device-mobile-table.model';
import { ManagementDeviceMobileManagerBusiness } from './management-device-mobile-manager.business';
import { ManagementDeviceMobileManagerWindow } from './management-device-mobile-manager.window';

@Component({
  selector: 'ias-management-device-mobile-manager',
  imports: [
    CommonModule,
    FormsModule,
    WindowComponent,
    WindowConfirmComponent,
    UploadControlComponent,
    ManagementDeviceMobileTableComponent,
    ManagementDeviceMobileInformationComponent,
  ],
  templateUrl: './management-device-mobile-manager.component.html',
  styleUrl: './management-device-mobile-manager.component.less',
  providers: [ManagementDeviceMobileManagerBusiness],
})
export class ManagementDeviceMobileManagerComponent implements OnInit {
  constructor(
    private business: ManagementDeviceMobileManagerBusiness,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.business.user.group().then((x) => {
      this.group.source = x;
    });
  }

  window = new ManagementDeviceMobileManagerWindow();

  group = {
    source: [] as UserGroup[],
  };

  table = {
    args: new ManagementDeviceMobileTableArgs(),
    load: new EventEmitter<ManagementDeviceMobileTableArgs>(),
    selecteds: [] as MobileDevice[],

    search: () => {
      this.table.load.emit(this.table.args);
    },
    on: {
      info: (data: MobileDevice) => {
        this.window.information.data = data;
        this.window.information.show = true;
      },
    },
  };
  create = {
    open: () => {
      this.window.information.clear();
      this.window.information.show = true;
    },
    ok: () => {
      this.window.information.show = false;
      this.table.search();
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
}
