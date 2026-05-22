import { EventEmitter } from '@angular/core';
import { WindowViewModel } from '../../../../../../../common/components/window-control/window.model';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';

export class SystemModuleSecurityManagerConfirmController {
  constructor() {}
  window = new ConfirmWindow();
  ok = {
    member: new EventEmitter<DepartmentMember>(),
    department: new EventEmitter<Department>(),
  };
  on = {
    open: (data: Department | DepartmentMember) => {
      this.window.clear();
      this.window.data = data;
      if (data instanceof Department) {
        this.window.message = `是否删除部门 ${data.Name} ?`;
      } else if (data instanceof DepartmentMember) {
        this.window.message = `是否删除部门员工 ${data.Name} ?`;
      } else {
      }
      this.window.show = true;
    },
    ok: () => {
      if (this.window.data instanceof Department) {
        this.ok.department.emit(this.window.data);
      } else if (this.window.data instanceof DepartmentMember) {
        this.ok.member.emit(this.window.data);
      } else {
      }
    },
    close: () => {
      this.window.show = false;
    },
  };
}
class ConfirmWindow extends WindowViewModel {
  message: string = '';
  data?: Department | DepartmentMember;
  clear() {
    this.message = '';
    this.data = undefined;
  }
}
