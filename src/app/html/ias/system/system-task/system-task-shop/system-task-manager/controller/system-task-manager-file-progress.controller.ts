import { EventEmitter } from '@angular/core';

import {
  UploadControlFile,
  UploadControlFileInfo,
} from '../../../../../../../common/components/upload-control/upload-control.model';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { SystemTaskModel } from '../../system-task-creation/component/system-task-creation.model';
import { TaskProgress } from '../../system-task-table/system-task-table.model';
import { SystemTaskManagerTestBusiness } from '../business/system-task-manager-test.business';
import { SystemTaskManagerBusiness } from '../business/system-task-manager.business';
import { FileProgress } from '../system-task-manager.model';

export class SystemTaskManagerFileProgressController {
  taskprogress = new EventEmitter<TaskProgress>();
  fileprogress = new EventEmitter<FileProgress>();
  get files() {
    return [
      ...this.file.waiting,
      ...this.file.uploading,
      ...this.file.completed,
    ];
  }
  get count() {
    return {
      waiting: this.file.waiting.length,
      uploading: this.file.uploading.length,
      completed: this.file.completed.length,
    };
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
  private max = 3;
  private file = {
    uploading: new Array<UploadControlFile>(),
    waiting: new Array<UploadControlFile>(),
    completed: new Array<UploadControlFileInfo>(),
    progress: new Array<FileProgress>(),
  };

  handle?: NodeJS.Timeout;
  try() {
    this.handle = setInterval(() => {
      if (this.file.waiting.length === 0) {
        clearInterval(this.handle);
        return;
      }
      if (this.file.uploading.length <= this.max) {
        while (this.file.uploading.length < this.max) {
          let file = this.file.waiting.shift()!;
          this.upload(file);
          this.file.uploading.push(file);
        }
      }
    });
  }

  load(data: SystemTaskModel) {
    this.task = data.task;
    this.file.waiting = [...data.files];
    this.try();
  }

  upload(file: UploadControlFile) {
    let progress = {
      filename: file.filename,
      progress: 0,
    };
    this.file.progress.push(progress);
    let event = new EventEmitter<FileProgress>();
    event.subscribe((x) => {
      this.fileprogress.emit(x);
      this.onfileprogress(x);
    });
    this.events.push(event);
    this.business.file.upload(file, event).then((info) => {
      let file_index = this.file.uploading.findIndex((file) => {
        return info.FileName.includes(file.filename);
      });
      if (file_index >= 0) {
        let file = this.file.uploading[file_index];
        let progress_index = this.file.progress.findIndex(
          (x) => x.filename === file.filename
        );
        if (progress_index >= 0) {
          this.file.progress.splice(progress_index, 1);
        }
        this.file.uploading.splice(file_index, 1);
      }
      this.file.completed.push({
        filename: info.FileName,
        size: info.FileSize,
        completed: true,
      });
      if (this.file.uploading.length == 0 && this.file.waiting.length == 0) {
        let args = {
          taskid: this.taskId,
          progress: 100,
          completed: this.file.completed.length,
          files: this.file.completed.map((x) => x.filename),
        };
        console.log(args);
        this.taskprogress.emit(args);
      }
    });
  }

  private onfileprogress(args: FileProgress) {
    let index = this.file.progress.findIndex(
      (x) => x.filename === args.filename
    );
    if (index < 0) return;

    this.file.progress[index].progress = args.progress;

    let count =
      this.file.waiting.length +
      this.file.uploading.length +
      this.file.completed.length;
    let completed = this.file.completed.length * 100;
    this.file.progress.forEach((x) => {
      completed += x.progress;
    });
    let progress = completed / count;

    if (progress < 100) {
      let files = [
        ...this.file.waiting.map((x) => x.filename),
        ...this.file.uploading.map((x) => x.filename),
        ...this.file.completed.map((x) => x.filename),
      ];
      this.taskprogress.emit({
        taskid: this.taskId,
        progress: progress,
        completed: this.file.completed.length,
        files: files,
      });
    }
  }
}
