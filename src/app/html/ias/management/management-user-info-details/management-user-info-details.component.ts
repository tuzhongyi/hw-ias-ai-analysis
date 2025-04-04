import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonLabelSelecComponent } from '../../../../common/components/common-label-select/common-label-select.component';
import { HowellSelectComponent } from '../../../../common/components/hw-select/select-control.component';
import { UserGroup } from '../../../../common/data-core/models/user/user-group.model';
import { User } from '../../../../common/data-core/models/user/user.model';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { SelectSecurityPriorityTypeComponent } from '../../share/select/select-security-priority-type/select-security-priority-type.component';
import { ManagementUserInfoDetailsPriorityController } from './controller/management-user-info-details-priority.controller';
import { ManagementUserInfoDetailsController } from './controller/management-user-info-details.controller';
import { ManagementUserInfoDetailsBusiness } from './management-user-info-details.business';

@Component({
  selector: 'ias-management-user-info-details',
  imports: [
    CommonModule,
    FormsModule,

    ContentHeaderComponent,
    HowellSelectComponent,
    CommonLabelSelecComponent,
    SelectSecurityPriorityTypeComponent,
  ],
  templateUrl: './management-user-info-details.component.html',
  styleUrl: './management-user-info-details.component.less',
  providers: [
    ManagementUserInfoDetailsBusiness,
    ManagementUserInfoDetailsPriorityController,
    ManagementUserInfoDetailsController,
  ],
})
export class ManagementUserInfoDetailsComponent implements OnInit {
  @Input('data') user?: User;
  @Output() ok = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    public controller: ManagementUserInfoDetailsController,
    private business: ManagementUserInfoDetailsBusiness,
    private toastr: ToastrService
  ) {}

  title = '用户信息';
  data = this.create();
  groups: UserGroup[] = [];

  get check() {
    if (!this.data.Username) {
      this.toastr.warning('请输入用户名');
      return false;
    }
    if (!this.data.Password) {
      this.toastr.warning('请输入密码');
      return false;
    }
    if (!this.data.Priorities || this.data.Priorities.length == 0) {
      this.toastr.warning('请选择用户权限');
      return false;
    }
    if (!this.data.GroupId) {
      this.toastr.warning('请选择用户组');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
    if (this.user) {
      this.data = Object.assign(this.data, this.user);
    }
    this.init();
    this.regist();
  }

  private create() {
    let user = new User();
    user.IsRoot = false;
    return user;
  }

  private regist() {
    this.controller.priority.select.subscribe((x) => {
      this.data.Priorities = [...x];
    });
  }

  private init() {
    this.business.group().then((x) => {
      this.groups = x;
    });
  }

  onok() {
    if (this.check) {
      let promise: Promise<User>;
      let group = this.groups.find((x) => x.GroupId == this.data.GroupId);
      if (group) {
        this.data.GroupName = group.GroupName;
      }

      if (this.user) {
        promise = this.business.update(this.data);
      } else {
        promise = this.business.create(this.data);
      }
      promise
        .then((x) => {
          this.ok.emit(x);
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
