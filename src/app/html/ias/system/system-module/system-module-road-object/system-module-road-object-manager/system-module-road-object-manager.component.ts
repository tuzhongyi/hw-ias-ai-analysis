import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleRoadObjectMapComponent } from '../system-module-road-object-map/system-module-road-object-map.component';
import { SystemModuleRoadObjectTableComponent } from '../system-module-road-object-table/system-module-road-object-table.component';
import { SystemModuleRoadObjectTableArgs } from '../system-module-road-object-table/system-module-road-object-table.model';
import { SystemModuleRoadObjectManagerBusiness } from './system-module-road-object-manager.business';
import { SystemModuleRoadObjectManagerSource } from './system-module-road-object-manager.source';
import { SystemModuleRoadObjectManagerWindow } from './window/system-module-road-object-manager.window';

@Component({
  selector: 'ias-system-module-road-object-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    SystemModuleRoadObjectTableComponent,
    SystemModuleRoadObjectMapComponent,
    WindowComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './system-module-road-object-manager.component.html',
  styleUrl: './system-module-road-object-manager.component.less',
  providers: [
    SystemModuleRoadObjectManagerBusiness,
    SystemModuleRoadObjectManagerSource,
  ],
})
export class SystemModuleRoadObjectManagerComponent implements OnInit {
  @Input() iswindow = false;
  @Input() operable = true;
  constructor(
    private business: SystemModuleRoadObjectManagerBusiness,
    public source: SystemModuleRoadObjectManagerSource,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleRoadObjectManagerWindow(this);

  ngOnInit(): void {}

  search() {
    this.table.load.emit(this.table.args);
  }

  table = {
    args: new SystemModuleRoadObjectTableArgs(),
    load: new EventEmitter<SystemModuleRoadObjectTableArgs>(),
    datas: [] as RoadObject[],
    selected: undefined as RoadObject | undefined,
    on: {
      load: (x: RoadObject[]) => {
        this.table.datas = x;
      },
    },
  };

  delete = {
    confirm: (data: RoadObject) => {
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
