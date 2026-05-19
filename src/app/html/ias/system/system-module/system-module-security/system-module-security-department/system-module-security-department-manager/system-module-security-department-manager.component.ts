import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../../common/components/window-confirm/window-confirm.component';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { WindowComponent } from '../../../../../share/window/component/window.component';
import { SystemModuleSecurityDepartmentDetailsMemberInfoComponent } from '../system-module-security-department-details-member/system-module-security-department-details-member-info/system-module-security-department-details-member-info.component';
import { SystemModuleSecurityDepartmentDetailsComponent } from '../system-module-security-department-details/system-module-security-department-details.component';
import { SystemModuleSecurityDepartmentTableComponent } from '../system-module-security-department-table/system-module-security-department-table.component';
import { SystemModuleSecurityDepartmentTableArgs } from '../system-module-security-department-table/system-module-security-department-table.model';
import { SystemModuleSecurityDepartmentWindow } from '../system-module-security-department.window';
import { SystemModuleSecurityDepartmentManagerBusiness } from './system-module-security-department-manager.business';

@Component({
  selector: 'ias-system-module-security-department-manager',
  imports: [
    CommonModule,
    FormsModule,

    WindowComponent,
    WindowConfirmComponent,
    SystemModuleSecurityDepartmentTableComponent,
    SystemModuleSecurityDepartmentDetailsComponent,
    SystemModuleSecurityDepartmentDetailsMemberInfoComponent,
  ],
  templateUrl: './system-module-security-department-manager.component.html',
  styleUrl: './system-module-security-department-manager.component.less',
  providers: [SystemModuleSecurityDepartmentManagerBusiness],
})
export class SystemModuleSecurityDepartmentManagerComponent
  implements OnInit, OnChanges
{
  @Input() args?: SystemModuleSecurityDepartmentTableArgs;
  @Input() mapable = true;
  @Input() iswindow = false;

  constructor(
    private business: SystemModuleSecurityDepartmentManagerBusiness,
    private toastr: ToastrService
  ) {}
  Language = Language;

  window = new SystemModuleSecurityDepartmentWindow();

  private change = {
    args: (simple: SimpleChange) => {
      if (simple) {
        this.table.args = {
          ...this.table.args,
          ...this.args,
        };
      }
    },
  };
  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
  }

  ngOnInit(): void {}

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
          this.confirm.on.close();
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

  confirm = {
    ok: new EventEmitter<DepartmentMember>(),
    on: {
      open: (data: Department | DepartmentMember) => {
        this.window.confirm.clear();
        this.window.confirm.data = data;
        if (data instanceof Department) {
          this.window.confirm.message = `是否删除部门 ${data.Name} ?`;
        } else if (data instanceof DepartmentMember) {
          this.window.confirm.message = `是否删除部门员工 ${data.Name} ?`;
        } else {
        }
        this.window.confirm.show = true;
      },
      ok: () => {
        if (this.window.confirm.data instanceof DepartmentMember) {
          this.confirm.ok.emit(this.window.confirm.data);
        } else if (this.window.confirm.data instanceof Department) {
          this.table.delete(this.window.confirm.data);
        } else {
        }
      },
      close: () => {
        this.window.confirm.show = false;
      },
    },
  };

  department = {
    on: {
      create: () => {
        this.window.details.data = undefined;
        this.window.details.show = true;
      },
      load: () => {
        this.table.args.first = false;
        this.table.load.emit(this.table.args);
        this.window.details.show = false;
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
}
