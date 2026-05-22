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
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { WindowComponent } from '../../../../../share/window/component/window.component';
import { SystemModuleSecurityMemberDetailsComponent } from '../system-module-security-member-details/system-module-security-member-details.component';
import { SystemModuleSecurityMemberTableComponent } from '../system-module-security-member-table/system-module-security-member-table.component';
import { SystemModuleSecurityMemberTableArgs } from '../system-module-security-member-table/system-module-security-member-table.model.ts';
import { SystemModuleSecurityMemberWindow } from '../system-module-security-member.window';
import { SystemModuleSecurityMemberManagerBusiness } from './system-module-security-member-manager.business';

@Component({
  selector: 'ias-system-module-security-member-manager',
  imports: [
    CommonModule,
    FormsModule,

    WindowComponent,
    WindowConfirmComponent,

    SystemModuleSecurityMemberTableComponent,
    SystemModuleSecurityMemberDetailsComponent,
  ],
  templateUrl: './system-module-security-member-manager.component.html',
  styleUrl: './system-module-security-member-manager.component.less',
  providers: [SystemModuleSecurityMemberManagerBusiness],
})
export class SystemModuleSecurityMemberManagerComponent
  implements OnInit, OnChanges
{
  @Input() args?: SystemModuleSecurityMemberTableArgs;
  @Input() mapable = true;
  @Input() iswindow = false;

  constructor(
    private business: SystemModuleSecurityMemberManagerBusiness,
    private toastr: ToastrService
  ) {}
  Language = Language;

  window = new SystemModuleSecurityMemberWindow();

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
          this.confirm.on.close();
          this.table.args.first = false;
          this.table.load.emit(this.table.args);
        })
        .catch((x) => {
          this.toastr.error('操作失败');
        });
    },
    on: {
      details: (data: DepartmentMember) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
    },
  };

  confirm = {
    ok: new EventEmitter<DepartmentMember>(),
    on: {
      open: (data: DepartmentMember) => {
        this.window.confirm.clear();
        this.window.confirm.data = data;
        this.window.confirm.message = `是否删除部门员工 ${data.Name} ?`;
        this.window.confirm.show = true;
      },
      ok: () => {
        if (this.window.confirm.data) {
          this.table.delete(this.window.confirm.data);
        }
      },
      close: () => {
        this.window.confirm.show = false;
      },
    },
  };

  on = {
    create: () => {
      this.window.details.data = undefined;
      this.window.details.show = true;
    },
  };
}
