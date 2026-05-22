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
import { Subscription } from 'rxjs';
import { DepartmentMember } from '../../../../../../../../common/data-core/models/arm/security/department-member.model';
import { SystemModuleSecurityDepartmentDetailsMemberTableComponent } from '../system-module-security-department-details-member-table/system-module-security-department-details-member-table.component';
import { SystemModuleSecurityDepartmentDetailsMemberTableArgs } from '../system-module-security-department-details-member-table/system-module-security-department-details-member-table.model';

@Component({
  selector: 'ias-system-module-security-department-details-member-other',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleSecurityDepartmentDetailsMemberTableComponent,
  ],
  templateUrl:
    './system-module-security-department-details-member-other.component.html',
  styleUrl:
    './system-module-security-department-details-member-other.component.less',
})
export class SystemModuleSecurityDepartmentDetailsMemberOtherComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() departmentId: string = '';
  @Input('load') _load = new EventEmitter<string>();
  @Output() close = new EventEmitter<void>();
  @Output() import = new EventEmitter<DepartmentMember[]>();

  constructor() {}

  args = new SystemModuleSecurityDepartmentDetailsMemberTableArgs(true);
  load =
    new EventEmitter<SystemModuleSecurityDepartmentDetailsMemberTableArgs>();

  private subscription = new Subscription();
  selecteds: DepartmentMember[] = [];
  private change = {
    department: (change: SimpleChange) => {
      if (change) {
        this.args.departmentId = this.departmentId;
        this.load.emit(this.args);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.department(changes['departmentId']);
  }
  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.args.departmentId = x;
        this.load.emit(this.args);
      });
      this.subscription.add(sub);
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  on = {
    close: () => {
      this.close.emit();
    },
    import: () => {
      if (this.selecteds.length > 0) {
        this.import.emit(this.selecteds);
      }
    },
  };
}
