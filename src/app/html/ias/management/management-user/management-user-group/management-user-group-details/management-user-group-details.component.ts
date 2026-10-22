import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { TreeDivisionMultipleComponent } from '../../../../share/tree/tree-division-multiple/tree-division-multiple.component';
import { ManagementUserGroupDetailsBusiness } from './management-user-group-details.business';

@Component({
  selector: 'ias-management-user-group-details',
  imports: [FormsModule, TreeDivisionMultipleComponent],
  templateUrl: './management-user-group-details.component.html',
  styleUrl: './management-user-group-details.component.less',
  providers: [ManagementUserGroupDetailsBusiness],
})
export class ManagementUserGroupDetailsComponent implements OnInit {
  @Input('data') group?: UserGroup;
  @Input() last?: UserGroup;
  @Output() ok = new EventEmitter<UserGroup>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private business: ManagementUserGroupDetailsBusiness,
    private toastr: ToastrService,
  ) {}

  data = this.create();
  selectedIds: string[] = [];

  get check() {
    if (!this.data.GroupName) {
      this.toastr.warning('请输入分组名称');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    if (this.group) {
      this.data = Object.assign(this.data, this.group);
      this.selectedIds = [...(this.group.DivisionIds ?? [])];
    } else {
      /* 新建：编号接在现有最大编号之后；没有现有分组时从 1 开始 */
      this.data.GroupId = (this.last?.GroupId ?? 0) + 1;
    }
  }

  private create() {
    let group = new UserGroup();
    group.DivisionIds = [];
    return group;
  }

  onok() {
    if (this.check) {
      this.data.DivisionIds = [...this.selectedIds];
      let promise: Promise<UserGroup>;

      if (this.group) {
        promise = this.business.update(this.data);
      } else {
        promise = this.business.create(this.data);
      }
      promise
        .then((x) => {
          // 接口没回填数据时，退回提交内容（至少带着分组名称）
          this.ok.emit(Object.assign(this.data, x));
          this.toastr.success('操作成功');
        })
        .catch((e) => {
          this.toastr.error('操作失败');
        });
    }
  }

  oncancel() {
    this.cancel.emit();
  }
}
