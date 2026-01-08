import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleRoadSectionDetailsManagerComponent } from '../system-module-road-section-details/system-module-road-section-details-manager/system-module-road-section-details-manager.component';
import { SystemModuleRoadSectionMapComponent } from '../system-module-road-section-map/system-module-road-section-map.component';
import { SystemModuleRoadSectionTableComponent } from '../system-module-road-section-table/system-module-road-section-table.component';
import { SystemModuleRoadSectionTableArgs } from '../system-module-road-section-table/system-module-road-section-table.model';
import { SystemModuleRoadSectionManagerInfoController } from './controller/system-module-road-section-manager-info.controller';
import { SystemModuleRoadSectionManagerController } from './controller/system-module-road-section-manager.controller';
import { SystemModuleRoadSectionManagerBusiness } from './system-module-road-section-manager.business';
import { SystemModuleRoadSectionManagerWindow } from './window/system-module-road-section-manager.window';

@Component({
  selector: 'ias-system-module-road-section-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadSectionTableComponent,
    SystemModuleRoadSectionMapComponent,
    SystemModuleRoadSectionDetailsManagerComponent,
    WindowComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './system-module-road-section-manager.component.html',
  styleUrl: './system-module-road-section-manager.component.less',
  providers: [
    SystemModuleRoadSectionManagerController,
    SystemModuleRoadSectionManagerInfoController,
    SystemModuleRoadSectionManagerBusiness,
  ],
})
export class SystemModuleRoadSectionManagerComponent implements OnInit {
  @Input() iswindow = false;
  @Input() operable = true;
  constructor(
    private business: SystemModuleRoadSectionManagerBusiness,
    private toastr: ToastrService
  ) {
    this.window.details.show = true;
  }

  window = new SystemModuleRoadSectionManagerWindow();

  ngOnInit(): void {
    this.window.details.create.subscribe((x) => {
      this.create.data = x;
    });
    this.window.details.ok.subscribe((x) => {
      if (this.create.doing) {
        this.create.ok(x);
      } else if (this.modify.doing) {
        this.modify.ok(x);
      }
    });
    this.window.details.cancel.subscribe(() => {
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
    args: new SystemModuleRoadSectionTableArgs(),
    load: new EventEmitter<SystemModuleRoadSectionTableArgs>(),
    datas: [] as RoadSection[],
    selected: undefined as RoadSection | undefined,
    onload: (x: RoadSection[]) => {
      this.table.datas = x;
    },
  };

  create = {
    data: undefined as RoadSection | undefined,
    doing: false,
    open: () => {
      this.create.doing = true;
      this.window.details.show = true;
      this.window.details.data = new RoadSection();
      this.table.selected = undefined;
    },
    ok: (data: RoadSection) => {
      this.window.details.show = false;
      this.create.doing = false;
      this.window.details.data = new RoadSection();
      this.table.load.emit(this.table.args);
    },
    cancel: () => {
      this.create.doing = false;
      this.window.details.show = false;
    },
  };
  modify = {
    doing: false,
    open: (data: RoadSection) => {
      this.modify.doing = true;
      this.window.details.show = true;
      this.window.details.data = data;
    },
    ok: (data: RoadSection) => {
      this.modify.doing = false;
      this.window.details.show = false;
      this.table.load.emit(this.table.args);
    },
    cancel: () => {
      this.modify.doing = false;
      this.window.details.show = false;
    },
    path: {
      change: (path: [number, number][]) => {
        if (this.window.details.data) {
          if (!this.window.details.data.GeoLine) {
            this.window.details.data.GeoLine = [];
          }
          this.window.details.data.GeoLine = path.map((x) => {
            return GisPoint.create(x[0], x[1]);
          });
        }
      },
    },
  };
  delete = {
    confirm: (data: RoadSection) => {
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
