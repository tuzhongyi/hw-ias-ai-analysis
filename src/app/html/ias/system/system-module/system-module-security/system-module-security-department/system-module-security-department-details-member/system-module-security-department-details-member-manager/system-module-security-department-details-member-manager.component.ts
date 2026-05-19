import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DepartmentMember } from '../../../../../../../../common/data-core/models/arm/security/department-member.model';
import { SystemModuleSecurityDepartmentDetailsMemberTableComponent } from '../system-module-security-department-details-member-table/system-module-security-department-details-member-table.component';

@Component({
  selector: 'ias-system-module-security-department-details-member-manager',
  imports: [
    CommonModule,
    SystemModuleSecurityDepartmentDetailsMemberTableComponent,
  ],
  templateUrl:
    './system-module-security-department-details-member-manager.component.html',
  styleUrl:
    './system-module-security-department-details-member-manager.component.less',
})
export class SystemModuleSecurityDepartmentDetailsMemberManagerComponent {
  @Input() departmentId: string = '';
  @Input() load = new EventEmitter<string>();

  @Output() create = new EventEmitter<void>();
  @Output() update = new EventEmitter<DepartmentMember>();
  @Output() delete = new EventEmitter<DepartmentMember>();

  on = {
    create: () => {
      this.create.emit();
    },
    update: (data: DepartmentMember) => {
      this.update.emit(data);
    },
    delete: (data: DepartmentMember) => {
      this.delete.emit(data);
    },
  };
}
