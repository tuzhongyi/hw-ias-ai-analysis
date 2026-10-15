import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { RoadArea } from '../../../../../../common/data-core/models/arm/geographic/road-area.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleRoadAreaDetailsManagerComponent } from '../system-module-road-area-details/system-module-road-area-details-manager/system-module-road-area-details-manager.component';
import { SystemModuleRoadAreaMapComponent } from '../system-module-road-area-map/system-module-road-area-map.component';
import { SystemModuleRoadAreaTableComponent } from '../system-module-road-area-table/system-module-road-area-table.component';
import { SystemModuleRoadAreaTableArgs } from '../system-module-road-area-table/system-module-road-area-table.model';
import { SystemModuleRoadAreaManagerBusiness } from './system-module-road-area-manager.business';
import { SystemModuleRoadAreaManagerSource } from './system-module-road-area-manager.source';
import { SystemModuleRoadAreaManagerWindow } from './window/system-module-road-area-manager.window';

@Component({
  selector: 'ias-system-module-road-area-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    SystemModuleRoadAreaTableComponent,
    SystemModuleRoadAreaMapComponent,
    SystemModuleRoadAreaDetailsManagerComponent,
    WindowComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './system-module-road-area-manager.component.html',
  styleUrl: './system-module-road-area-manager.component.less',
  providers: [
    SystemModuleRoadAreaManagerBusiness,
    SystemModuleRoadAreaManagerSource,
  ],
})
export class SystemModuleRoadAreaManagerComponent implements OnInit {
  @Input() iswindow = false;
  @Input() operable = true;
  constructor(
    private business: SystemModuleRoadAreaManagerBusiness,
    public source: SystemModuleRoadAreaManagerSource,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleRoadAreaManagerWindow(this);

  ngOnInit(): void {}

  search() {
    this.table.fit = true;
    this.table.load.emit(this.table.args);
  }

  table = {
    args: new SystemModuleRoadAreaTableArgs(),
    load: new EventEmitter<SystemModuleRoadAreaTableArgs>(),
    datas: [] as RoadArea[],
    selected: undefined as RoadArea | undefined,
    /**
     * 这次刷新列表要不要让地图重新定位。
     * 查找 / 增改要（新结果得看得见），删除不要 —— 删除只刷新列表，地图停在用户当前看的地方。
     */
    fit: true,
    on: {
      load: (x: RoadArea[]) => {
        this.table.datas = x;
      },
      // 地图上点中多边形 → 选中表格对应行（反向的表格选中已由 [(selected)] 传给地图）
      select: (x: RoadArea) => {
        this.table.selected = x;
      },
    },
  };

  delete = {
    confirm: (data: RoadArea) => {
      this.window.confirm.data = data;
      this.window.confirm.show = true;
    },
    ok: () => {
      if (this.window.confirm.data) {
        this.business
          .delete(this.window.confirm.data.Id)
          .then(() => {
            this.table.fit = false;
            this.table.load.emit(this.table.args);
            this.window.confirm.show = false;
            this.toastr.success('删除成功');
          })
          .catch((x) => {
            this.toastr.error('删除失败');
          });
      }
    },
    cancel: () => {
      this.window.confirm.show = false;
    },
  };
}
