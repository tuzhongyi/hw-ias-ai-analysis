import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleRoadSectionDetailsManagerComponent } from '../system-module-road-section-details/system-module-road-section-details-manager/system-module-road-section-details-manager.component';
import { SystemModuleRoadSectionMapComponent } from '../system-module-road-section-map/system-module-road-section-map.component';
import { SystemModuleRoadSectionTableComponent } from '../system-module-road-section-table/system-module-road-section-table.component';
import { SystemModuleRoadSectionTableArgs } from '../system-module-road-section-table/system-module-road-section-table.model';
import { SystemModuleRoadSectionManagerBusiness } from './system-module-road-section-manager.business';
import { SystemModuleRoadSectionManagerSource } from './system-module-road-section-manager.source';
import { SystemModuleRoadSectionManagerWindow } from './window/system-module-road-section-manager.window';

@Component({
  selector: 'ias-system-module-road-section-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    SystemModuleRoadSectionTableComponent,
    SystemModuleRoadSectionMapComponent,
    SystemModuleRoadSectionDetailsManagerComponent,
    WindowComponent,
    WindowConfirmComponent,
  ],
  templateUrl: './system-module-road-section-manager.component.html',
  styleUrl: './system-module-road-section-manager.component.less',
  providers: [
    SystemModuleRoadSectionManagerBusiness,
    SystemModuleRoadSectionManagerSource,
  ],
})
export class SystemModuleRoadSectionManagerComponent implements OnInit {
  @Input() iswindow = false;
  @Input() operable = true;
  constructor(
    private business: SystemModuleRoadSectionManagerBusiness,
    public source: SystemModuleRoadSectionManagerSource,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleRoadSectionManagerWindow(this);

  ngOnInit(): void {}

  search() {
    this.table.load.emit(this.table.args);
  }

  table = {
    args: new SystemModuleRoadSectionTableArgs(),
    load: new EventEmitter<SystemModuleRoadSectionTableArgs>(),
    datas: [] as RoadSection[],
    selected: undefined as RoadSection | undefined,
    on: {
      load: (x: RoadSection[]) => {
        this.table.datas = x;
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
