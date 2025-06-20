import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Road } from '../../../../../../common/data-core/models/arm/geographic/road.model';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import { SystemModuleRoadInfoBusiness } from './system-module-road-info.business';

@Component({
  selector: 'ias-system-module-road-info',
  imports: [FormsModule, TextSpaceBetweenDirective],
  templateUrl: './system-module-road-info.component.html',
  styleUrl: './system-module-road-info.component.less',
  providers: [SystemModuleRoadInfoBusiness],
})
export class SystemModuleRoadInfoComponent {
  @Input('data') data: Road = new Road();
  @Output() dataChange = new EventEmitter<Road>();
  @Output() ok = new EventEmitter<Road>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private business: SystemModuleRoadInfoBusiness,
    private toastr: ToastrService
  ) {}

  get check() {
    if (!this.data.Name) {
      this.toastr.error('请输入道路名称');
      return false;
    }
    if (!this.data.GeoLine || this.data.GeoLine.length < 2) {
      this.toastr.error('请绘制道路线路');
      return false;
    }
    return true;
  }

  onok() {
    if (!this.check) return;
    let promise: Promise<Road>;

    if (this.data.Id) {
      promise = this.update();
    } else {
      promise = this.create();
    }

    promise
      .then((x) => {
        this.data = x;
        this.dataChange.emit(x);
        this.ok.emit(x);
      })
      .catch((x) => {
        this.toastr.error('操作失败');
      });
  }
  oncancel() {
    this.cancel.emit();
  }

  private async create() {
    return this.business.create(this.data).then((x) => {
      this.toastr.success('创建成功');
      return x;
    });
  }
  private async update() {
    return this.business.update(this.data).then((x) => {
      this.toastr.success('操作成功');
      return x;
    });
  }
}
