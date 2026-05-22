import { EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { SystemModuleSecurityMemberManagerBusiness } from '../../system-module-security-member/system-module-security-member-manager/system-module-security-member-manager.business';
import { SystemModuleSecurityMemberTableArgs } from '../../system-module-security-member/system-module-security-member-table/system-module-security-member-table.model.ts';
import { SystemModuleSecurityMemberWindow } from '../../system-module-security-member/system-module-security-member.window';

export class SystemModuleSecurityManagerMemberController {
  constructor(
    private business: SystemModuleSecurityMemberManagerBusiness,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleSecurityMemberWindow();
  confirm = {
    close: new EventEmitter<void>(),
  };

  selected = false;
  table = {
    args: new SystemModuleSecurityMemberTableArgs(),
    load: new EventEmitter<SystemModuleSecurityMemberTableArgs>(),

    search: () => {
      this.table.args.first = true;
      this.table.load.emit(this.table.args);
    },
    delete: (data: DepartmentMember) => {
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
  };

  details = {
    open: (data: DepartmentMember) => {
      this.window.details.data = data;
      this.window.details.show = true;
    },
    changed: () => {
      this.table.args.first = false;
      this.table.load.emit(this.table.args);
      this.window.details.show = false;
    },
  };
}
