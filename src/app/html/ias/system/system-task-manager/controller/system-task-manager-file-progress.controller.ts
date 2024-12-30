import { EventEmitter } from '@angular/core';
import { UploadControlFile } from '../../../../../common/components/upload-control/upload-control.model';
import { AnalysisTask } from '../../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { SystemTaskModel } from '../../system-task-creation/system-task-creation.model';
import { TaskProgress } from '../../system-task-table/system-task-table.model';
import { SystemTaskManagerTestBusiness } from '../business/system-task-manager-test.business';
import { SystemTaskManagerBusiness } from '../business/system-task-manager.business';
import { FileProgress } from '../system-task-manager.model';

export class SystemTaskManagerFileProgressController {
  taskprogress = new EventEmitter<TaskProgress>();
  fileprogress = new EventEmitter<FileProgress>();
  get files() {
    return this.file.info;
  }
  get taskId() {
    if (this.task) {
      return this.task.Id;
    }
    return '';
  }

  constructor(private business: SystemTaskManagerBusiness) {}

  private test = new SystemTaskManagerTestBusiness();

  private task?: AnalysisTask;
  private events: EventEmitter<FileProgress>[] = [];

  private file = {
    info: new Array<UploadControlFile>(),
    progress: new Array<FileProgress>(),
  };

  load(data: SystemTaskModel) {
    this.task = data.task;
    this.file.info = data.files;

    for (let i = 0; i < data.files.length; i++) {
      const _data = data.files[i];
      let progress = {
        filename: _data.filename,
        progress: 0,
      };
      this.file.progress.push(progress);
      let event = new EventEmitter<FileProgress>();
      event.subscribe((x) => {
        this.fileprogress.emit(x);
        this.onfileprogress(x);
      });
      this.events.push(event);

      // this.business.file.upload(_data, event);
      this.test.upload(_data, event);
    }
  }

  private onfileprogress(args: FileProgress) {
    let index = this.file.progress.findIndex(
      (x) => x.filename === args.filename
    );
    if (index < 0) return;
    this.file.progress[index].progress = args.progress;

    let count = 0;
    let completed = 0;
    this.file.progress.forEach((x) => {
      count += x.progress;
      if (x.progress >= 100) {
        completed++;
      }
    });
    let progress = count / this.file.progress.length;

    this.taskprogress.emit({
      taskid: this.taskId,
      progress: progress,
      completed: completed,
    });
  }
}
