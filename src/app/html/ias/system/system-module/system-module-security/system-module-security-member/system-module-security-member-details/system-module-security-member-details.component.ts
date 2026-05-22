import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentMember } from '../../../../../../../common/data-core/models/arm/security/department-member.model';
import { Department } from '../../../../../../../common/data-core/models/arm/security/department.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { InputSelectDepartmentComponent } from '../../../../../share/input-select-department/input-select-department.component';
import { SystemModuleSecurityMemberDetailsBusiness } from './system-module-security-member-details.business';

@Component({
  selector: 'ias-system-module-security-member-details',
  imports: [CommonModule, FormsModule, InputSelectDepartmentComponent],
  templateUrl: './system-module-security-member-details.component.html',
  styleUrl: './system-module-security-member-details.component.less',
  providers: [SystemModuleSecurityMemberDetailsBusiness],
})
export class SystemModuleSecurityMemberDetailsComponent implements OnInit {
  @Input('data') source?: DepartmentMember;
  @Output() ok = new EventEmitter<DepartmentMember>();
  @Output() close = new EventEmitter<void>();

  constructor(
    private business: SystemModuleSecurityMemberDetailsBusiness,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.department.init().then((x) => {
      if (this.source) {
        this.data = ObjectTool.assign(this.source, DepartmentMember);
        this.department.load(this.source);
      }
    });
  }

  data = new DepartmentMember();

  department = {
    clear: false,
    datas: new Map<string, Department>(),
    selected: [] as string[],
    init: async () => {
      let datas = await this.business.department.all();
      this.department.datas = new Map(datas.map((x) => [x.Id, x]));
    },
    load: (data: DepartmentMember) => {
      if (data.DepartmentIds) {
        this.department.selected = data.DepartmentIds;
      }
    },
    change: (data: Department) => {
      if (this.department.selected.includes(data.Id)) {
        this.department.selected = this.department.selected.filter(
          (x) => x != data.Id
        );
      } else {
        this.department.selected.push(data.Id);
      }
    },
  };

  private get check() {
    if (!this.data.Name) {
      this.toastr.warning('请填写员工姓名');
      return false;
    }
    if (!this.data.MobileNo) {
      // if(!/^1[3456789]\d{9}$/.test(this.data.MobileNo)){
      //   this.toastr.warning('请填写正确的手机号');
      //   return false;
      // }
      this.toastr.warning('请填写手机号码');
      return false;
    }
    if (this.department.selected.length == 0) {
      this.toastr.warning('请选择所属部门');
      return false;
    }
    return true;
  }

  on = {
    ok: () => {
      if (this.check) {
        this.data.DepartmentIds = [...this.department.selected];
        let promise;
        if (this.source) {
          promise = this.business.update(this.data);
        } else {
          promise = this.business.create(this.data);
        }

        promise
          .then((x) => {
            this.toastr.success('操作成功');
            this.ok.emit(this.data);
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
