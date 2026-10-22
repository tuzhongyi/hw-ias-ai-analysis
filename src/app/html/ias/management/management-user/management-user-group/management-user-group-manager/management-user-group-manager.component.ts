import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { ManagementUserGroupDetailsComponent } from '../management-user-group-details/management-user-group-details.component';
import { ManagementUserGroupTableComponent } from '../management-user-group-table/management-user-group-table.component';
import { ManagementUserGroupTableArgs } from '../management-user-group-table/management-user-group-table.model';
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
    args: new ManagementUserGroupTableArgs(),
    load: new EventEmitter<ManagementUserGroupTableArgs>(),
    selecteds: [] as UserGroup[],
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
    /** 列表中 GroupId 最大的一行，新建分组时传给详情用于取下一个编号 */
    last: undefined as UserGroup | undefined,
    loaded: (datas: UserGroup[]) => {
      this.table.last = datas.reduce<UserGroup | undefined>(
        (last, item) => (!last || item.GroupId > last.GroupId ? item : last),
        undefined,
      );
    },
    modify: (data: UserGroup) => {
      this.window.details.data = data;
      this.window.details.show = true;
    },
  };

  delete = {
    /** 请求进行中，防止重复点击确定发起第二次删除 */
    loading: false,
    confirm: () => {
      if (this.table.selecteds.length > 0) {
        /* 快照当前选中：确认期间列表重载不会改变这次要删除的内容 */
        this.window.confirm.datas = [...this.table.selecteds];
        this.window.confirm.show = true;
      }
    },
    do: () => {
      if (this.delete.loading) return;
      let datas = this.window.confirm.datas;
      if (datas.length === 0) return;

      this.delete.loading = true;
      this.business
        .delete(datas)
        .then((count) => {
          if (datas.length === count) {
            this.toastr.success('操作成功');
            this.table.reload();
          } else {
            this.toastr.error('操作失败');
          }
        })
        .finally(() => {
          /* 清空选中：重载后列表是新对象，旧引用留着会让下次删除重复提交同一分组 */
          this.table.selecteds = [];
          this.window.confirm.datas = [];
          this.window.confirm.show = false;
          this.delete.loading = false;
        });
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
}
