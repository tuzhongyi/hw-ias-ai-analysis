import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../common/components/window-confirm/window-confirm.component';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';
import { SystemModuleRoadInfoComponent } from '../system-module-road-info/system-module-road-info.component';
import { SystemModuleRoadMapComponent } from '../system-module-road-map/system-module-road-map.component';
import { SystemModuleRoadTableComponent } from '../system-module-road-table/system-module-road-table.component';
import { SystemModuleRoadTableArgs } from '../system-module-road-table/system-module-road-table.model';
import { SystemModuleRoadManagerInfoController } from './controller/system-module-road-manager-info.controller';
import { SystemModuleRoadManagerController } from './controller/system-module-road-manager.controller';
import { SystemModuleRoadManagerBusiness } from './system-module-road-manager.business';
import { SystemModuleRoadManagerWindow } from './window/system-module-road-manager.window';

@Component({
  selector: 'ias-system-module-road-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadTableComponent,
    SystemModuleRoadMapComponent,
    SystemModuleRoadInfoComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './system-module-road-manager.component.html',
  styleUrl: './system-module-road-manager.component.less',
  providers: [
    SystemModuleRoadManagerController,
    SystemModuleRoadManagerInfoController,
    SystemModuleRoadManagerBusiness,
  ],
})
export class SystemModuleRoadManagerComponent implements OnInit {
  constructor(
    public controller: SystemModuleRoadManagerController,
    private business: SystemModuleRoadManagerBusiness,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleRoadManagerWindow();

  ngOnInit(): void {
    this.controller.info.create.subscribe((x) => {
      this.create.data = x;
    });
    this.controller.info.ok.subscribe((x) => {
      if (this.create.doing) {
        this.create.ok(x);
      } else if (this.modify.doing) {
        this.modify.ok(x);
      }
    });
    this.controller.info.cancel.subscribe(() => {
      if (this.create.doing) {
        this.create.cancel();
      } else if (this.modify.doing) {
        this.modify.cancel();
      }
    });
  }

  onsearch() {
    this.table.load.emit(this.table.args);
  }

  table = {
    args: new SystemModuleRoadTableArgs(),
    load: new EventEmitter<SystemModuleRoadTableArgs>(),
    datas: [] as Road[],
    selected: undefined as Road | undefined,
    onload: (x: Road[]) => {
      this.table.datas = x;
    },
  };

  create = {
    data: undefined as Road | undefined,
    doing: false,
    open: () => {
      this.create.doing = true;
      this.controller.info.show = true;
    },
    ok: (data: Road) => {
      this.controller.info.show = false;
      this.create.doing = false;
      this.controller.info.data = new Road();
      this.table.load.emit(this.table.args);
    },
    cancel: () => {
      this.create.doing = false;
      this.controller.info.show = false;
    },
  };
  modify = {
    doing: false,
    open: (data: Road) => {
      this.modify.doing = true;
      this.controller.info.show = true;
      this.controller.info.data = data;
    },
    ok: (data: Road) => {
      this.modify.doing = false;
      this.controller.info.show = false;
      this.table.load.emit(this.table.args);
    },
    cancel: () => {
      this.modify.doing = false;
      this.controller.info.show = false;
    },
  };
  delete = {
    confirm: (data: Road) => {
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
