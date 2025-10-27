import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { AnalysisGpsTask } from '../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/window.component';
import { SystemModuleGpsTaskDetailsContainerComponent } from '../system-module-gps-task-details/system-module-gps-task-details-container/system-module-gps-task-details-container.component';
import { SystemModuleGpsTaskTableComponent } from '../system-module-gps-task-table/system-module-gps-task-table.component';
import { SystemModuleGpsTaskTableArgs } from '../system-module-gps-task-table/system-module-gps-task-table.model';
import { SystemModuleGpsTaskManagerBusiness } from './system-module-gps-task-manager.business';
import { SystemModuleGpsTaskManagerSource } from './system-module-gps-task-manager.source';
import { SystemModuleGpsTaskManagerWindow } from './system-module-gps-task-manager.window';

@Component({
  selector: 'ias-system-module-gps-task-manager',
  imports: [
    CommonModule,
    FormsModule,
    WindowComponent,
    WindowConfirmComponent,
    PictureListComponent,
    SystemModuleGpsTaskTableComponent,
    SystemModuleGpsTaskDetailsContainerComponent,
  ],
  templateUrl: './system-module-gps-task-manager.component.html',
  styleUrl: './system-module-gps-task-manager.component.less',
  providers: [
    SystemModuleGpsTaskManagerSource,
    SystemModuleGpsTaskManagerBusiness,
  ],
})
export class SystemModuleGpsTaskManagerComponent implements OnInit {
  constructor(
    public source: SystemModuleGpsTaskManagerSource,
    private business: SystemModuleGpsTaskManagerBusiness,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleGpsTaskManagerWindow();

  ngOnInit(): void {
    this.init();
  }

  private init() {}

  table = {
    args: new SystemModuleGpsTaskTableArgs(),
    load: new EventEmitter<SystemModuleGpsTaskTableArgs>(),
    selecteds: [] as AnalysisGpsTask[],

    search: () => {
      this.table.load.emit(this.table.args);
    },
    on: {
      details: (data: AnalysisGpsTask) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
    },
  };

  on = {
    details: {
      save: (data: AnalysisGpsTask) => {
        this.window.details.show = false;
        this.table.args.reset = false;
        this.table.load.emit(this.table.args);
      },
    },
    delete: () => {
      if (this.table.selecteds.length > 0) {
        let ids = this.table.selecteds.map((x) => x.Id);
        this.business.delete(ids).then(() => {
          this.toastr.success('删除成功');
          this.table.args.reset = false;
          this.table.load.emit(this.table.args);
          this.window.confirm.show = false;
          this.table.selecteds = this.table.selecteds.filter(
            (x) => !ids.includes(x.Id)
          );
        });
      }
    },
  };
}
