import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  SystemTaskModel,
  TaskCompletedArgs,
} from '../system-task-creation/component/system-task-creation.model';

import { Router } from '@angular/router';
import { LocalStorage } from '../../../../../common/storage/local.storage';
import { TaskDuration } from '../../../../../common/storage/system-compare-storage/system-compare.storage';
import { Language } from '../../../../../common/tools/language-tool/language';
import { SystemPath } from '../../system.model';
import {
  AnalysisTaskModel,
  SystemTaskTableArgs,
} from '../system-task-table/system-task-table.model';
import { SystemTaskManagerBusiness } from './business/system-task-manager.business';
import { SystemTaskManagerController } from './controller/system-task-manager.controller';

import { IShop } from '../../../../../common/data-core/models/arm/analysis/shop.interface';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { LanguageTool } from '../../../../../common/tools/language-tool/language.tool';
import { ShopStatisticStatus } from '../system-task-route/system-task-route-statistic/system-task-route-statistic.model';
import { SystemTaskVideoArgs } from '../system-task-video/system-task-video.model';
import {
  SystemTaskManagerImports,
  SystemTaskManagerProviders,
} from './system-task-manager.module';
import { SystemTaskManagerWindow } from './system-task-manager.window';

@Component({
  selector: 'ias-system-task-manager',
  templateUrl: './system-task-manager.component.html',
  styleUrl: './system-task-manager.component.less',
  imports: [...SystemTaskManagerImports],
  providers: [...SystemTaskManagerProviders],
})
export class SystemTaskManagerComponent implements OnInit {
  constructor(
    private business: SystemTaskManagerBusiness,
    public controller: SystemTaskManagerController,
    private toastr: ToastrService,
    private local: LocalStorage,
    private router: Router,
    private language: LanguageTool
  ) {
    this.filter.duration.value =
      this.local.system.task.duration.get() ?? TaskDuration.year;

    this.filter.duration.onchange();
  }

  window = new SystemTaskManagerWindow();

  table = {
    args: new SystemTaskTableArgs(),
    load: new EventEmitter<SystemTaskTableArgs>(),
  };
  Language = Language;

  ngOnInit(): void {
    this.controller.file.complete.subscribe((data) => {
      this.on.completed(data);
    });
    this.table.args.finished = this.local.system.task.index.get();
  }

  filter = {
    duration: {
      value: TaskDuration.year,

      onchange: () => {
        let today = this.table.args.duration.end;
        this.table.args.duration = this.controller.duration.get(
          this.filter.duration.value,
          today
        );
        this.local.system.task.duration.set(this.filter.duration.value);
      },
    },

    onsearch: () => {
      this.table.load.emit(this.table.args);
    },
  };

  onstate(finished?: boolean) {
    this.table.args.finished = finished;
    this.local.system.task.index.set(finished);
    this.table.load.emit(this.table.args);
  }

  async onresult(data: AnalysisTaskModel) {
    this.window.route.title = data.Name ?? '';
    this.window.route.data = data;
    this.window.route.show = true;
    // this.window.result.title = `${
    //   data.Name
    // } ${await this.language.analysis.server.TaskType(data.TaskType)}`;
    // this.window.result.data = data;
    // this.window.result.show = true;
  }
  ondetails(data: AnalysisTaskModel) {
    this.window.details.data = data;
    let files = this.controller.file.get(data.Id);
    if (files) {
      this.window.details.files = files;
    } else {
      this.window.details.files = (data.Files ?? []).map((x) => {
        return { filename: x };
      });
    }

    this.window.details.show = true;
  }
  onfiles(data: AnalysisTaskModel) {
    this.local.system.task.info.set({ Id: data.Id, Name: data.Name ?? '' });
    this.router.navigateByUrl(`${SystemPath.task_file}`);
  }
  onerror(e: Error) {
    this.toastr.error(e.message);
  }

  create = {
    open: () => {
      this.window.creation.clear();
      this.window.creation.show = true;
    },
    ok: (data: SystemTaskModel) => {
      this.table.load.emit(this.table.args);
      this.controller.file.load(data);
      this.window.creation.show = false;
    },
  };

  delete = {
    confirm: (data: AnalysisTaskModel) => {
      this.window.confirm.data = data;
      this.window.confirm.show = true;
    },
    ok: () => {
      if (this.window.confirm.data) {
        this.business.task
          .delete(this.window.confirm.data.Id)
          .then(() => {
            this.table.load.emit(this.table.args);
            this.toastr.success('删除任务成功');
          })
          .catch((x) => {
            this.table.load.emit(this.table.args);
            this.toastr.error('删除任务时发生异常');
          })
          .finally(() => {
            this.window.confirm.show = false;
          });
      } else {
        this.window.confirm.show = false;
      }
    },
  };

  on = {
    completed: (args: TaskCompletedArgs) => {
      this.business.task
        .source(args.task, args.files)
        .then((x) => {
          this.table.load.emit(this.table.args);
          this.window.details.show = false;
        })
        .catch((e) => {
          this.toastr.error('上传文件后，写入文件名失败');
        });
    },
  };
  route = {
    on: {
      current: (data: FileGpsItem) => {
        if (this.window.route.data) {
          this.window.video.title = `${this.window.route.data.Name}`;
          let args = new SystemTaskVideoArgs();
          args.TaskId = this.window.route.data.Id;
          args.Longitude = data.Longitude;
          args.Latitude = data.Latitude;
          this.window.video.args = args;
          this.window.video.show = true;
        }
      },
      analysis: (status?: ShopStatisticStatus) => {
        this.window.shop.analysis.status = status;
        this.window.shop.analysis.data = this.window.route.data;
        this.window.shop.analysis.show = true;
      },
      registration: (detected?: boolean) => {
        this.window.shop.registration.data = this.window.route.data;
        this.window.shop.registration.state = detected;
        this.window.shop.registration.show = true;
      },
      video: (data: IShop) => {
        if (this.window.route.data && data.Location) {
          this.window.video.title = `${data.Name}`;
          let args = new SystemTaskVideoArgs();
          args.TaskId = this.window.route.data.Id;
          args.Longitude = data.Location.Longitude;
          args.Latitude = data.Location.Latitude;
          args.Rectified = true;
          this.window.video.args = args;
          this.window.video.show = true;
        }
      },
    },
  };
}
