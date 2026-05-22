import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { InputSelectDepartmentComponent } from '../../../../share/input-select-department/input-select-department.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleSecurityDepartmentDetailsMemberInfoComponent } from '../system-module-security-department/system-module-security-department-details-member/system-module-security-department-details-member-info/system-module-security-department-details-member-info.component';
import { SystemModuleSecurityDepartmentDetailsComponent } from '../system-module-security-department/system-module-security-department-details/system-module-security-department-details.component';
import { SystemModuleSecurityDepartmentManagerBusiness } from '../system-module-security-department/system-module-security-department-manager/system-module-security-department-manager.business';
import { SystemModuleSecurityDepartmentTableComponent } from '../system-module-security-department/system-module-security-department-table/system-module-security-department-table.component';
import { SystemModuleSecurityMemberDetailsComponent } from '../system-module-security-member/system-module-security-member-details/system-module-security-member-details.component';
import { SystemModuleSecurityMemberManagerBusiness } from '../system-module-security-member/system-module-security-member-manager/system-module-security-member-manager.business';
import { SystemModuleSecurityMemberTableComponent } from '../system-module-security-member/system-module-security-member-table/system-module-security-member-table.component';
import { SystemModuleSecurityManagerConfirmController } from './controller/system-module-security-manager-confirm.controller';
import { SystemModuleSecurityManagerDepartmentController } from './controller/system-module-security-manager-department.controller';
import { SystemModuleSecurityManagerMemberController } from './controller/system-module-security-manager-member.controller';

@Component({
  selector: 'ias-system-module-security-manager',
  imports: [
    CommonModule,
    FormsModule,

    WindowComponent,
    WindowConfirmComponent,
    InputSelectDepartmentComponent,

    SystemModuleSecurityDepartmentTableComponent,
    SystemModuleSecurityDepartmentDetailsComponent,
    SystemModuleSecurityDepartmentDetailsMemberInfoComponent,

    SystemModuleSecurityMemberTableComponent,
    SystemModuleSecurityMemberDetailsComponent,
  ],
  templateUrl: './system-module-security-manager.component.html',
  styleUrl: './system-module-security-manager.component.less',
  providers: [
    SystemModuleSecurityDepartmentManagerBusiness,
    SystemModuleSecurityMemberManagerBusiness,
  ],
})
export class SystemModuleSecurityManagerComponent implements OnInit, OnDestroy {
  constructor(
    member: SystemModuleSecurityMemberManagerBusiness,
    department: SystemModuleSecurityDepartmentManagerBusiness,
    public toastr: ToastrService
  ) {
    this.department = new SystemModuleSecurityManagerDepartmentController(
      department,
      toastr
    );
    this.member = new SystemModuleSecurityManagerMemberController(
      member,
      toastr
    );
    this.confirm = new SystemModuleSecurityManagerConfirmController();
  }

  department: SystemModuleSecurityManagerDepartmentController;
  member: SystemModuleSecurityManagerMemberController;
  confirm: SystemModuleSecurityManagerConfirmController;
  private subscription = new Subscription();

  private regist = {
    department: () => {
      let sub = this.department.confirm.close.subscribe((x) => {
        this.confirm.on.close();
      });
      this.subscription.add(sub);
    },
    member: () => {
      let sub = this.member.confirm.close.subscribe((x) => {
        this.confirm.on.close();
      });
      this.subscription.add(sub);
    },
    confirm: () => {
      let sub = this.confirm.ok.department.subscribe((x) => {
        this.department.table.delete(x);
      });
      this.subscription.add(sub);
    },
  };

  ngOnInit(): void {
    this.regist.department();
    this.regist.member();
    this.regist.confirm();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  on = {
    tab: (isdepartment: boolean) => {
      this.department.selected = isdepartment;
      this.member.selected = !isdepartment;
    },
  };
}
