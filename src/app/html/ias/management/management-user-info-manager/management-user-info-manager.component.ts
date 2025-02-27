import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../common/components/window-confirm/window-confirm.component';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { User } from '../../../../common/data-core/models/user/user.model';
import { ManagementUserInfoDetailsComponent } from '../management-user-info-details/management-user-info-details.component';
import { ManagementUserInfoTableComponent } from '../management-user-info-table/management-user-info-table.component';
import { ManagementUserInfoManagerBusiness } from './management-user-info-manager.business';
import { ManagementUserInfoManagerWindow } from './management-user-info-manager.window';

@Component({
  selector: 'ias-management-user-info-manager',
  imports: [
    CommonModule,
    FormsModule,
    WindowComponent,
    WindowConfirmComponent,
    ManagementUserInfoTableComponent,
    ManagementUserInfoDetailsComponent,
  ],
  templateUrl: './management-user-info-manager.component.html',
  styleUrl: './management-user-info-manager.component.less',
  providers: [ManagementUserInfoManagerBusiness],
})
export class ManagementUserInfoManagerComponent {
  constructor(
    private business: ManagementUserInfoManagerBusiness,
    private toastr: ToastrService
  ) {}

  window = new ManagementUserInfoManagerWindow();

  table = {
    load: new EventEmitter<void>(),
    selecteds: [] as User[],
    modify: (data: User) => {
      this.window.details.data = data;
      this.window.details.show = true;
    },
  };

  delete = {
    confirm: () => {
      if (this.table.selecteds.length > 0) {
        this.window.confirm.show = true;
      }
    },
    do: () => {
      if (this.table.selecteds.length > 0) {
        this.business.delete(this.table.selecteds).then((count) => {
          if (this.table.selecteds.length === count) {
            this.toastr.success('操作成功');
            this.table.load.emit();
          } else {
            this.toastr.error('操作失败');
          }
          this.window.confirm.show = false;
        });
      }
    },
  };

  details = {
    open: () => {
      this.window.details.clear();
      this.window.details.show = true;
    },
    ok: () => {
      this.table.load.emit();
      this.window.details.show = false;
    },
  };
}
