import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { ManagementUserGroupDetailsComponent } from '../management-user-group-details/management-user-group-details.component';
import { ManagementUserGroupTableComponent } from '../management-user-group-table/management-user-group-table.component';
import { ManagementUserGroupManagerBusiness } from './management-user-group-manager.business';
import { ManagementUserGroupManagerWindow } from './management-user-group-manager.window';

@Component({
  selector: 'ias-management-user-group-manager',
  imports: [
    CommonModule,
    FormsModule,
    WindowComponent,
    WindowConfirmComponent,
    ManagementUserGroupTableComponent,
    ManagementUserGroupDetailsComponent,
  ],
  templateUrl: './management-user-group-manager.component.html',
  styleUrl: './management-user-group-manager.component.less',
  providers: [ManagementUserGroupManagerBusiness],
})
export class ManagementUserGroupManagerComponent {
  constructor(
    private business: ManagementUserGroupManagerBusiness,
    private toastr: ToastrService,
  ) {}

  window = new ManagementUserGroupManagerWindow();

  table = {
    load: new EventEmitter<void>(),
    selecteds: [] as UserGroup[],
    modify: (data: UserGroup) => {
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
