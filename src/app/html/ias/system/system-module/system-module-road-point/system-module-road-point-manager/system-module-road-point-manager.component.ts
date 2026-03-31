import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleRoadPointDetailsManagerComponent } from '../system-module-road-point-details/system-module-road-point-details-manager/system-module-road-point-details-manager.component';
import { SystemModuleRoadPointMapComponent } from '../system-module-road-point-map/system-module-road-point-map.component';
import { SystemModuleRoadPointTableComponent } from '../system-module-road-point-table/system-module-road-point-table.component';
import { SystemModuleRoadPointTableArgs } from '../system-module-road-point-table/system-module-road-point-table.model';
import { SystemModuleRoadPointManagerBusiness } from './system-module-road-point-manager.business';
import { SystemModuleRoadPointManagerSource } from './system-module-road-point-manager.source';
import { SystemModuleRoadPointManagerWindow } from './window/system-module-road-point-manager.window';

@Component({
  selector: 'ias-system-module-road-point-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    WindowComponent,
    WindowConfirmComponent,
    SystemModuleRoadPointTableComponent,
    SystemModuleRoadPointMapComponent,
    SystemModuleRoadPointDetailsManagerComponent,
  ],
  templateUrl: './system-module-road-point-manager.component.html',
  styleUrl: './system-module-road-point-manager.component.less',
  providers: [
    SystemModuleRoadPointManagerBusiness,
    SystemModuleRoadPointManagerSource,
  ],
})
export class SystemModuleRoadPointManagerComponent implements OnInit {
  @Input() iswindow = false;
  @Input() operable = true;
  constructor(
    private business: SystemModuleRoadPointManagerBusiness,
    public source: SystemModuleRoadPointManagerSource,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleRoadPointManagerWindow(this);

  ngOnInit(): void {}

  search() {
    this.table.load.emit(this.table.args);
  }

  table = {
    args: new SystemModuleRoadPointTableArgs(),
    load: new EventEmitter<SystemModuleRoadPointTableArgs>(),
    datas: [] as RoadPoint[],
    selected: undefined as RoadPoint | undefined,
    on: {
      load: (x: RoadPoint[]) => {
        this.table.datas = x;
      },
    },
  };

  delete = {
    confirm: (data: RoadPoint) => {
      this.window.confirm.data = data;
      this.window.confirm.show = true;
    },
    ok: () => {
      if (this.window.confirm.data) {
        this.business
          .delete(this.window.confirm.data.Id)
          .then(() => {
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
