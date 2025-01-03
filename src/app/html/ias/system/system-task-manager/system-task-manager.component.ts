import { Component, EventEmitter, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SystemTaskModel } from '../system-task-creation/system-task-creation.model';

import { Router } from '@angular/router';
import { LocalStorage } from '../../../../common/storage/local.storage';
import {
  AnalysisTaskModel,
  SystemTaskTableArgs,
} from '../system-task-table/system-task-table.model';
import { SystemPath } from '../system.model';
import { SystemTaskManagerBusiness } from './business/system-task-manager.business';
import { SystemTaskManagerController } from './controller/system-task-manager.controller';
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
  ) {}

  window = new SystemTaskManagerWindow();

  table = {
    args: new SystemTaskTableArgs(),
    load: new EventEmitter<SystemTaskTableArgs>(),
  };

  ngOnInit(): void {
    this.controller.file.complete.subscribe((data) => {
      let names = data.files.map((x) => x.filename);
      this.business.task.source(data.task, names).then((x) => {
        this.table.load.emit(this.table.args);
      });
    });
    this.table.args.finished = !!this.local.system.task.index.get();
  }

  onstate(finished: boolean) {
    this.table.args.finished = finished;
    this.local.system.task.index.set(finished ? 1 : 0);
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
    this.local.system.task.id.set(data.Id);
    this.router.navigateByUrl(`${SystemPath.task_file}`);
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
