import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { User } from '../../../../../../common/data-core/models/user/user.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { ManagementUserGroupDetailsComponent } from '../../management-user-group/management-user-group-details/management-user-group-details.component';
import { ManagementUserInfoDetailsComponent } from '../management-user-info-details/management-user-info-details.component';
import { ManagementUserInfoTableComponent } from '../management-user-info-table/management-user-info-table.component';
import { ManagementUserInfoTableArgs } from '../management-user-info-table/management-user-info-table.model';
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
    ManagementUserGroupDetailsComponent,
  ],
  templateUrl: './management-user-info-manager.component.html',
  styleUrl: './management-user-info-manager.component.less',
  providers: [ManagementUserInfoManagerBusiness],
})
export class ManagementUserInfoManagerComponent {
  constructor(
    private business: ManagementUserInfoManagerBusiness,
    private toastr: ToastrService,
  ) {}

  window = new ManagementUserInfoManagerWindow();

  table = {
    args: new ManagementUserInfoTableArgs(),
    load: new EventEmitter<ManagementUserInfoTableArgs>(),
    selecteds: [] as User[],
    /** 名称筛选：表格在已拉取的数据里本地过滤 */
    search: () => {
      this.table.args.reload = false;
      this.table.load.emit(this.table.args);
    },
    /** 增删改后重新从服务端拉取 */
    reload: () => {
      this.table.args.reload = true;
      this.table.load.emit(this.table.args);
    },
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
            this.table.reload();
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
      this.table.reload();
      this.window.details.show = false;
    },
  };

  group = {
    open: (last?: UserGroup) => {
      /* 详情已加载分组列表，直接把最大编号那行传给新建窗口 */
      this.window.group.last = last;
      this.window.group.show = true;
    },
    cancel: () => {
      this.window.group.show = false;
    },
    ok: (data: UserGroup) => {
      this.window.group.show = false;
      // 交给详情刷新分组列表并选中新分组
      this.window.details.group = data;
    },
  };
}
