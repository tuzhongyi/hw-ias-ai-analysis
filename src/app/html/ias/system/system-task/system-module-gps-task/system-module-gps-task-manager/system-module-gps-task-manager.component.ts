import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { AnalysisGpsTask } from '../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';
import { SceneLabel } from '../../../../../../common/data-core/models/arm/analysis/llm/scene-label.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleGpsTaskDetailsContainerComponent } from '../system-module-gps-task-details/system-module-gps-task-details-container/system-module-gps-task-details-container.component';
import { SystemModuleGpsTaskPictureDrawingComponent } from '../system-module-gps-task-picture/system-module-gps-task-picture-drawing/system-module-gps-task-picture-drawing.component';
import { SystemModuleGpsTaskPictureDrawingArgs } from '../system-module-gps-task-picture/system-module-gps-task-picture-drawing/system-module-gps-task-picture-drawing.model';
import { SystemModuleGpsTaskTableComponent } from '../system-module-gps-task-table/system-module-gps-task-table.component';
import { SystemModuleGpsTaskTableArgs } from '../system-module-gps-task-table/system-module-gps-task-table.model';
import { SystemModuleGpsTaskVideoCaptureManagerComponent } from '../system-module-gps-task-video/system-module-gps-task-video-capture-manager/system-module-gps-task-video-capture-manager.component';
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
    SystemModuleGpsTaskPictureDrawingComponent,
    SystemModuleGpsTaskVideoCaptureManagerComponent,
  ],
  templateUrl: './system-module-gps-task-manager.component.html',
  styleUrl: './system-module-gps-task-manager.component.less',
  providers: [
    SystemModuleGpsTaskManagerSource,
    SystemModuleGpsTaskManagerBusiness,
  ],
})
export class SystemModuleGpsTaskManagerComponent implements OnInit {
  @Input() iswindow = false;
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
    draw: {
      drawn: new EventEmitter<SceneLabel>(),
      open: (args: { title: string; image: string; label?: SceneLabel }) => {
        let _args = new SystemModuleGpsTaskPictureDrawingArgs();
        _args.image = args.image;
        _args.data = args.label;
        this.window.draw.open(args.title, _args);
        this.window.draw.show = true;
      },
      save: (data: SceneLabel) => {
        this.window.draw.show = false;
        setTimeout(() => {
          this.on.draw.drawn.emit(data);
        });
      },
    },
    details: {
      save: (data: AnalysisGpsTask) => {
        this.window.details.show = false;
        this.table.args.reset = false;
        this.table.load.emit(this.table.args);
      },
    },
    video: {
      capture: {
        completed: new EventEmitter<ArrayBuffer>(),
        location: new EventEmitter<FileGpsItem>(),
        open: (filename: string) => {
          this.window.video.capture.filename = filename;
          this.window.video.capture.show = true;
        },
        upload: (data: ArrayBuffer) => {
          this.window.video.capture.data = data;
        },
        save: (data: { image: ArrayBuffer; location?: FileGpsItem }) => {
          this.on.video.capture.completed.emit(data.image);
          if (data.location) {
            this.on.video.capture.location.emit(data.location);
          }
          this.window.video.capture.show = false;
        },
        close: () => {
          this.window.video.capture.show = false;
        },
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
