import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonLabelSelecComponent } from '../../../../../../common/components/common-label-select/common-label-select.component';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { UserGroup } from '../../../../../../common/data-core/models/user/user-group.model';
import { User } from '../../../../../../common/data-core/models/user/user.model';
import { SelectSecurityPriorityTypeComponent } from '../../../../share/select/select-security-priority-type/select-security-priority-type.component';
import { ManagementUserInfoDetailsPriorityController } from './controller/management-user-info-details-priority.controller';
import { ManagementUserInfoDetailsController } from './controller/management-user-info-details.controller';
import { ManagementUserInfoDetailsBusiness } from './management-user-info-details.business';

@Component({
  selector: 'ias-management-user-info-details',
  imports: [
    CommonModule,
    FormsModule,
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
    private toastr: ToastrService,
  ) {}
  data = this.create();
  groups: UserGroup[] = [];
  group = {
    show: false,
    selected: [] as EnumNameValue<number>[],
  };

  get check() {
    if (!this.data.Username) {
      this.toastr.warning('请输入用户名');
      return false;
    }
    if (!this.data.Password) {
      this.toastr.warning('请输入密码');
      return false;
    }
    if (!isFinite(this.data.GroupId)) {
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
      let group = x.find((item) => item.GroupId === this.data.GroupId);
      if (group) {
        this.group.selected = [
          new EnumNameValue(group.GroupId, group.GroupName),
        ];
      }
    });
  }

  ongroup(item: UserGroup) {
    this.data.GroupId = item.GroupId;
    // GroupId 0 是「新建分组」，名称交给下面的输入框填
    this.data.GroupName = item.GroupId === 0 ? '' : item.GroupName;
    this.group.selected = [new EnumNameValue(item.GroupId, item.GroupName)];
    this.group.show = false;
  }

  onok() {
    if (this.check) {
      let promise: Promise<User>;

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
