import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SystemTaskModel } from '../system-task-creation/component/system-task-creation.model';

import { Router } from '@angular/router';
import { LocalStorage } from '../../../../../common/storage/local.storage';
import { Language } from '../../../../../common/tools/language';
import { SystemPath } from '../../system.model';
import {
  AnalysisTaskModel,
  SystemTaskTableArgs,
} from '../system-task-table/system-task-table.model';
import { SystemTaskManagerBusiness } from './business/system-task-manager.business';
import { SystemTaskManagerController } from './controller/system-task-manager.controller';
import { TaskDurationValue } from './system-task-manager.model';
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
    private router: Router
  ) {
    this.filter.duration.value =
      this.local.system.task.duration.get() ?? TaskDurationValue.year;

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
      this.business.task
        .source(data.task, data.files)
        .then((x) => {
          this.table.load.emit(this.table.args);
        })
        .catch((e) => {
          this.toastr.error('上传文件后，写入文件名失败');
        });
    });
    this.table.args.finished = this.local.system.task.index.get();
  }

  filter = {
    duration: {
      value: TaskDurationValue.year,

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

  onresult(data: AnalysisTaskModel) {
    this.window.result.data = data;
    this.window.result.show = true;
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
}
