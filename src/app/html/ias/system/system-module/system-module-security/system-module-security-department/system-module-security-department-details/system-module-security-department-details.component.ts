import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { OptionMode } from '../../../../../../../common/data-core/enums/option.enum';
import { AutomaticAssignmentRule } from '../../../../../../../common/data-core/models/arm/security/automatic-assignment-rule.model';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { SystemModuleSecurityDepartmentDetailsInfoComponent } from '../system-module-security-department-details-info/system-module-security-department-details-info.component';
import { SystemModuleSecurityDepartmentDetailsMemberManagerComponent } from '../system-module-security-department-details-member/system-module-security-department-details-member-manager/system-module-security-department-details-member-manager.component';
import { SystemModuleSecurityDepartmentSource } from '../system-module-security-department.source';
import { SystemModuleSecurityDepartmentDetailsBusiness } from './system-module-security-department-details.business';

@Component({
  selector: 'ias-system-module-security-department-details',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleSecurityDepartmentDetailsInfoComponent,
    SystemModuleSecurityDepartmentDetailsMemberManagerComponent,
  ],
  templateUrl: './system-module-security-department-details.component.html',
  styleUrl: './system-module-security-department-details.component.less',
  providers: [
    SystemModuleSecurityDepartmentSource,
    SystemModuleSecurityDepartmentDetailsBusiness,
  ],
})
export class SystemModuleSecurityDepartmentDetailsComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input('data') _data?: Department;

  @Output() ok = new EventEmitter<Department>();
  @Output() close = new EventEmitter<void>();

  @Input() confirmok?: EventEmitter<DepartmentMember>;
  @Output() confirmopen = new EventEmitter<DepartmentMember>();
  @Output() confirmclose = new EventEmitter<void>();
  @Output() membercreate = new EventEmitter<Department>();
  @Output() memberupdate = new EventEmitter<DepartmentMember>();

  constructor(
    public source: SystemModuleSecurityDepartmentSource,
    private business: SystemModuleSecurityDepartmentDetailsBusiness,
    private toastr: ToastrService
  ) {}

  option = OptionMode.create;
  private subscription = new Subscription();

  private change = {
    data: (change: SimpleChange) => {
      if (change) {
        if (this._data) {
          this.department.data = ObjectTool.assign(this._data, Department);
          this.option = OptionMode.update;
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.data(changes['_data']);
  }
  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private init() {
    let data = new Department();
    data.DepartmentType = 1;
    data.AssignmentRule = new AutomaticAssignmentRule();
    data.AssignmentRule.Enabled = true;
    data.AssignmentRule.EventTypes = [];
    return data;
  }
  private regist() {
    if (this.confirmok) {
      let sub = this.confirmok.subscribe((x) => {
        this.business.member
          .delete(x.Id)
          .then((x) => {
            this.toastr.success('操作成功');
            this.confirmclose.emit();
            this.member.load.emit(this.department.data.Id);
          })
          .catch((e) => {
            this.toastr.error('操作失败');
          });
        this.subscription.add(sub);
      });
    }
  }

  private get check() {
    if (this.department.data.AssignmentRule) {
      if (this.department.data.AssignmentRule.Enabled) {
        if (this.department.data.AssignmentRule.EventTypes.length == 0) {
          this.toastr.warning('请选择事件自动分配规则的事件类型');
          return false;
        }
      }
    }
    return true;
  }

  member = {
    load: new EventEmitter<string>(),
    on: {
      create: (data: Department) => {
        this.membercreate.emit(data);
      },
      update: (data: DepartmentMember) => {
        this.memberupdate.emit(data);
      },
      delete: (data: DepartmentMember) => {
        this.confirmopen.emit(data);
      },
    },
  };

  department = {
    data: this.init(),
    on: {
      ok: () => {
        if (this.check) {
          let promise;
          if (this._data) {
            promise = this.business.update(this.department.data);
          } else {
            promise = this.business.create(this.department.data);
          }

          promise
            .then((x) => {
              this.toastr.success('操作成功');
              this.ok.emit(this.department.data);
            })
            .catch((x) => {
              this.toastr.error('操作失败');
            });
        }
      },
      close: () => {
        this.close.emit();
      },
    },
  };
}
