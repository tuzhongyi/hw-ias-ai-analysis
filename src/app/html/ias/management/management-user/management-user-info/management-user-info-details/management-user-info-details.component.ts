import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
export class ManagementUserInfoDetailsComponent implements OnInit, OnChanges {
  @Input('data') user?: User;
  @Output() ok = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
  /** 新建成功的分组，由 manager 传入；变化后刷新分组列表并选中它 */
  @Input() groupcreated?: UserGroup;
  /** 点击「新建」按钮，把现有分组中编号最大的一行交给 manager 打开新建分组窗口 */
  @Output() groupcreate = new EventEmitter<UserGroup | undefined>();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupcreated'] && this.groupcreated) {
      this.refresh(this.groupcreated);
    }
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

  /**
   * 权限类型列表加载完成：用用户已有的 Priorities 回填勾选。
   * 必须取列表里的同一个对象 —— 勾选状态靠引用相等（selected.includes(item)），
   * 新建 EnumNameValue 实例是点不亮的。
   *
   * 比较要按字符串：PriorityTypes 经过 class-transformer 后 Value 是数字（"1" → 1），
   * 而 User.Priorities 是服务端原样的字符串数组
   */
  onpriorityloaded(datas: EnumNameValue<string>[]) {
    let values = new Set((this.data.Priorities ?? []).map((x) => `${x}`));
    let selected = datas.filter((x) => values.has(`${x.Value}`));
    this.controller.priority.set(selected);
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

  /** 新建分组成功后，重新拉取分组列表并选中新分组 */
  private async refresh(created: UserGroup) {
    let groups = await this.business.group();
    let target = groups.find((item) => item.GroupId === created.GroupId);
    if (!target) {
      // 新建接口没回填编号时按名称找
      target = groups.find((item) => item.GroupName === created.GroupName);
    }
    this.groups = groups;
    if (target) {
      this.ongroup(target);
    }
  }

  /** 现有分组中 GroupId 最大的一行，新建分组时接续编号 */
  private get last() {
    return this.groups.reduce<UserGroup | undefined>(
      (last, item) => (!last || item.GroupId > last.GroupId ? item : last),
      undefined,
    );
  }

  oncreate() {
    this.groupcreate.emit(this.last);
  }

  ongroup(item: UserGroup) {
    this.data.GroupId = item.GroupId;
    this.data.GroupName = item.GroupName;
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
