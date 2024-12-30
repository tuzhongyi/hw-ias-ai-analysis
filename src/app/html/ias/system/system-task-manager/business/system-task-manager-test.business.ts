import { EventEmitter } from '@angular/core';
import { UploadControlFile } from '../../../../../common/components/upload-control/upload-control.model';
import { FileProgress } from '../system-task-manager.model';

export class SystemTaskManagerTestBusiness {
  constructor() {
    setInterval(() => {
      this.test();
    }, 1000);
  }

  private files: Map<string, UploadControlFile> = new Map();
  private events: Map<string, EventEmitter<FileProgress>> = new Map();

  private test() {
    this.events.forEach((event, key) => {
      let value = Math.random() * 100;
      event.emit({ filename: key, progress: value });
    });
  }

  upload(file: UploadControlFile, progress: EventEmitter<FileProgress>) {
    if (!this.files.has(file.filename)) {
      this.files.set(file.filename, file);
      this.events.set(file.filename, progress);
    }
  }
}
