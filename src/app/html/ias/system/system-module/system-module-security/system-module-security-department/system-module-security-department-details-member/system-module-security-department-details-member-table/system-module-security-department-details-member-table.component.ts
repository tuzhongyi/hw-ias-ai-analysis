import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DepartmentMember } from '../../../../../../../../common/data-core/models/arm/security/department-member.model';
import { SystemModuleSecurityDepartmentDetailsMemberTableBusiness } from './system-module-security-department-details-member-table.business';
import { SystemModuleSecurityDepartmentDetailsMemberTableArgs } from './system-module-security-department-details-member-table.model';

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
  implements OnInit, OnDestroy
{
  @Input() args = new SystemModuleSecurityDepartmentDetailsMemberTableArgs(
    false
  );
  @Input('load')
  _load?: EventEmitter<SystemModuleSecurityDepartmentDetailsMemberTableArgs>;
  @Input() operable = true;
  @Input() multiple = false;
  @Input() selecteds: DepartmentMember[] = [];
  @Output() selectedsChange = new EventEmitter<DepartmentMember[]>();

  @Output() update = new EventEmitter<DepartmentMember>();
  @Output() delete = new EventEmitter<DepartmentMember>();

  constructor(
    private business: SystemModuleSecurityDepartmentDetailsMemberTableBusiness
  ) {}

  datas: DepartmentMember[] = [];
  widths: string[] = ['65px', '65px', 'auto', 'auto', '100px', '100px'];
  get selectedIds() {
    return this.selecteds.map((x) => x.Id);
  }

  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.load(this.args);

    if (!this.multiple) {
      this.widths.splice(0, 1);
    }
    if (!this.operable) {
      this.widths.splice(this.widths.length - 1, 1);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(args: SystemModuleSecurityDepartmentDetailsMemberTableArgs) {
    this.business.load(args).then((x) => {
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
    select: {
      single: (data: DepartmentMember) => {
        if (!this.multiple) {
          this.selecteds = [];
        }
        let index = this.selecteds.findIndex((x) => x.Id == data.Id);
        if (index < 0) {
          this.selecteds.push(data);
        } else {
          this.selecteds.splice(index, 1);
        }
      },
      all: () => {
        if (this.selecteds.length == this.datas.length) {
          this.selecteds = [];
        } else {
          this.selecteds = [...this.datas];
        }
      },
    },
    modify: (data: DepartmentMember, e: Event) => {
      this.update.emit(data);
    },
    delete: (data: DepartmentMember, e: Event) => {
      this.delete.emit(data);
    },
  };
}
