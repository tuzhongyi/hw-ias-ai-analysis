import { EventEmitter, Injectable } from '@angular/core';
import { SystemTaskModel } from '../../system-task-creation/system-task-creation.model';
import { TaskProgress } from '../../system-task-table/system-task-table.model';
import { SystemTaskManagerBusiness } from '../business/system-task-manager.business';
import { FileProgress } from '../system-task-manager.model';
import { SystemTaskManagerFileProgressController } from './system-task-manager-file-progress.controller';

@Injectable()
export class SystemTaskManagerFileController {
  constructor(private business: SystemTaskManagerBusiness) {}

  progress = {
    task: new EventEmitter<TaskProgress>(),
    file: new EventEmitter<FileProgress>(),
  };
  complete = new EventEmitter<SystemTaskModel>();

  private files: SystemTaskManagerFileProgressController[] = [];
  private datas: SystemTaskModel[] = [];

  get(taskId: string) {
    let file = this.files.find((x) => x.taskId === taskId);
    if (file) {
      return file.files;
    }
    return undefined;
  }

  load(data: SystemTaskModel) {
    this.datas.push(data);
    let controller = new SystemTaskManagerFileProgressController(this.business);
    controller.fileprogress.subscribe((value) => {
      this.progress.file.emit(value);
    });
    controller.taskprogress.subscribe((value) => {
      this.progress.task.emit(value);
      if (value.progress >= 100) {
        this.oncomplete(value.taskid);
      }
    });
    controller.load(data);
    this.files.push(controller);
  }

  oncomplete(id: string) {
    let data = this.datas.find((x) => x.task.Id === id);
    if (data) {
      this.complete.emit(data);
    }
  }
}
