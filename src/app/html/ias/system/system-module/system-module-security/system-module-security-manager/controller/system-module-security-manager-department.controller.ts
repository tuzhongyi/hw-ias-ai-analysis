import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { SystemModuleSecurityDepartmentManagerBusiness } from '../../system-module-security-department/system-module-security-department-manager/system-module-security-department-manager.business';
import { SystemModuleSecurityDepartmentTableArgs } from '../../system-module-security-department/system-module-security-department-table/system-module-security-department-table.model';
import { SystemModuleSecurityDepartmentWindow } from '../../system-module-security-department/system-module-security-department.window';

export class SystemModuleSecurityManagerDepartmentController {
  constructor(
    private business: SystemModuleSecurityDepartmentManagerBusiness,
    private toastr: ToastrService
  ) {}

  selected = true;
  window = new SystemModuleSecurityDepartmentWindow();
  confirm = {
    close: new EventEmitter<void>(),
  };
  table = {
    args: new SystemModuleSecurityDepartmentTableArgs(),
    load: new EventEmitter<SystemModuleSecurityDepartmentTableArgs>(),

    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
    delete: (data: Department) => {
      this.business
        .delete(data.Id)
        .then((x) => {
          this.toastr.success('操作成功');
          this.confirm.close.emit();
          this.table.args.first = false;
          this.table.load.emit(this.table.args);
        })
        .catch((x) => {
          this.toastr.error('操作失败');
        });
    },
    on: {
      details: (data: Department) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
    },
  };
  member = {
    load: new EventEmitter<string>(),
    delete: new EventEmitter<string>(),
    on: {
      create: (data: Department) => {
        this.window.member.data = undefined;
        this.window.member.departmentId = data.Id;
        this.window.member.show = true;
      },
      update: (data: DepartmentMember) => {
        this.window.member.data = data;
        this.window.member.show = true;
      },
      load: () => {
        this.member.load.emit(this.window.member.departmentId);
      },
    },
  };
  on = {
    create: () => {
      this.window.details.data = undefined;
      this.window.details.show = true;
    },
    load: () => {
      this.table.args.first = false;
      this.table.load.emit(this.table.args);
      this.window.details.show = false;
    },
  };
}
