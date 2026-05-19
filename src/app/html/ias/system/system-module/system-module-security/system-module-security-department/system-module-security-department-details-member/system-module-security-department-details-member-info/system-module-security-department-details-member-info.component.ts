import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentMember } from '../../../../../../../../common/data-core/models/arm/security/department-member.model';
import { TextSpaceBetweenDirective } from '../../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { ObjectTool } from '../../../../../../../../common/tools/object-tool/object.tool';
import { SystemModuleSecurityDepartmentDetailsMemberInfoBusiness } from './system-module-security-department-details-member-info.business';

@Component({
  selector: 'ias-system-module-security-department-details-member-info',
  imports: [CommonModule, FormsModule, TextSpaceBetweenDirective],
  templateUrl:
    './system-module-security-department-details-member-info.component.html',
  styleUrl:
    './system-module-security-department-details-member-info.component.less',
  providers: [SystemModuleSecurityDepartmentDetailsMemberInfoBusiness],
})
export class SystemModuleSecurityDepartmentDetailsMemberInfoComponent
  implements OnChanges
{
  @Input('data') source?: DepartmentMember;
  @Input() departmentId: string = '';
  @Output() ok = new EventEmitter<DepartmentMember>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: SystemModuleSecurityDepartmentDetailsMemberInfoBusiness,
    private toastr: ToastrService
  ) {}

  private change = {
    departmentId: (change: SimpleChange) => {
      if (change) {
        if (this.departmentId) {
          this.data.DepartmentIds = [this.departmentId];
        }
      }
    },
    source: (change: SimpleChange) => {
      if (change) {
        if (this.source) {
          this.data = ObjectTool.assign(this.source, DepartmentMember);
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.departmentId(changes['departmentId']);
    this.change.source(changes['source']);
  }

  data = new DepartmentMember();

  private get check() {
    if (!this.data.Name) {
      this.toastr.warning('请填写姓名');
      return false;
    }
    if (!this.data.MobileNo) {
      this.toastr.warning('请填写手机号码');
      return false;
    }
    return true;
  }

  on = {
    ok: () => {
      if (this.check) {
        let promise;
        if (this.source) {
          promise = this.business.update(this.data);
        } else {
          promise = this.business.create(this.data);
        }
        promise
          .then((x) => {
            this.toastr.success('操作成功');
            this.ok.emit(x);
          })
          .catch((x) => {
            this.toastr.error('操作失败');
          });
      }
    },
    close: () => {
      this.close.emit();
    },
  };
}
