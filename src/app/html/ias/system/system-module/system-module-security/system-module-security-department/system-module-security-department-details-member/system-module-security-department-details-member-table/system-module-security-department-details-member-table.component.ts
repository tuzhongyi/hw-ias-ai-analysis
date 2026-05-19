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
import { Subscription } from 'rxjs';
import { DepartmentMember } from '../../../../../../../../common/data-core/models/arm/security/department-member.model';
import { SystemModuleSecurityDepartmentDetailsMemberTableBusiness } from './system-module-security-department-details-member-table.business';

@Component({
  selector: 'ias-system-module-security-department-details-member-table',
  imports: [CommonModule],
  templateUrl:
    './system-module-security-department-details-member-table.component.html',
  styleUrl:
    './system-module-security-department-details-member-table.component.less',
  providers: [SystemModuleSecurityDepartmentDetailsMemberTableBusiness],
})
export class SystemModuleSecurityDepartmentDetailsMemberTableComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() departmentId: string = '';
  @Input('load') _load?: EventEmitter<string>;

  @Output() update = new EventEmitter<DepartmentMember>();
  @Output() delete = new EventEmitter<DepartmentMember>();

  constructor(
    private business: SystemModuleSecurityDepartmentDetailsMemberTableBusiness
  ) {}

  datas: DepartmentMember[] = [];
  widths: string[] = ['65px', 'auto', 'auto', '100px', '100px'];
  selected?: DepartmentMember;
  private subscription = new Subscription();
  ngOnChanges(changes: SimpleChanges): void {
    this.change.department(changes['departmentId']);
  }
  ngOnInit(): void {
    this.regist();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private change = {
    department: (simple: SimpleChange) => {
      if (simple) {
        if (this.departmentId) {
          this.load(this.departmentId);
        }
      }
    },
  };
  private load(departmentId: string) {
    this.business.load(departmentId).then((x) => {
      this.datas = x;
    });
  }

  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(x);
      });
      this.subscription.add(sub);
    }
  }

  on = {
    select: (data: DepartmentMember) => {
      this.selected = data;
    },
    modify: (data: DepartmentMember, e: Event) => {
      this.update.emit(data);
    },
    delete: (data: DepartmentMember, e: Event) => {
      this.delete.emit(data);
    },
  };
}
