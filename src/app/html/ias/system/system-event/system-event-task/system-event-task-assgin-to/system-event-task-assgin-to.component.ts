import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { DepartmentMember } from '../../../../../../common/data-core/models/arm/security/department-member.model';
import { Department } from '../../../../../../common/data-core/models/arm/security/department.model';
import { SystemModuleSecurityDepartmentDetailsMemberTableComponent } from '../../../system-module/system-module-security/system-module-security-department/system-module-security-department-details-member/system-module-security-department-details-member-table/system-module-security-department-details-member-table.component';
import { SystemModuleSecurityDepartmentDetailsMemberTableArgs } from '../../../system-module/system-module-security/system-module-security-department/system-module-security-department-details-member/system-module-security-department-details-member-table/system-module-security-department-details-member-table.model';
import { SystemEventTaskAssginToBusiness } from './system-event-task-assgin-to.business';

@Component({
  selector: 'ias-system-event-task-assgin-to',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleSecurityDepartmentDetailsMemberTableComponent,
  ],
  templateUrl: './system-event-task-assgin-to.component.html',
  styleUrl: './system-event-task-assgin-to.component.less',
  providers: [SystemEventTaskAssginToBusiness],
})
export class SystemEventTaskAssginToComponent implements OnInit {
  @Input() data?: MobileEventRecord;
  @Output() ok = new EventEmitter<MobileEventRecord>();
  @Output() close = new EventEmitter<void>();
  constructor(
    private business: SystemEventTaskAssginToBusiness,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.business.department().then((x) => {
      this.department.datas = x;
    });
  }

  department = {
    datas: [] as Department[],
    selected: undefined as Department | undefined,
    select: (item?: Department) => {
      this.department.selected = item;
    },
  };

  member = {
    args: new SystemModuleSecurityDepartmentDetailsMemberTableArgs(false),
    load: new EventEmitter<SystemModuleSecurityDepartmentDetailsMemberTableArgs>(),
    selected: undefined as DepartmentMember | undefined,
    search: () => {
      this.member.args.departmentId = this.department.selected
        ? this.department.selected.Id
        : undefined;
      this.member.load.emit(this.member.args);
    },
  };

  private get check() {
    if (!this.member.selected) {
      this.toastr.warning('请选择需要派单的员工');
      return false;
    }
    return true;
  }

  on = {
    ok: () => {
      if (this.check) {
        if (this.data && this.member.selected) {
          this.business
            .assgin(this.data.Id, this.member.selected)
            .then((x) => {
              this.ok.emit(x);
              this.toastr.success('派单成功');
            })
            .catch((x) => {
              this.toastr.error('派单失败');
            });
        }
      }
    },
    close: () => {
      this.close.emit();
    },
  };
}
