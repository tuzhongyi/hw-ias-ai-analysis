import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadControlFile } from '../../../../../../../common/components/upload-control/upload-control.model';
import { SystemTaskManagerFileBusiness } from '../../../../system-task/system-task-shop/system-task-manager/business/system-task-manager-file.business';
import { FileProgress } from './system-module-file-upload-progress-manager.model';

@Component({
  selector: 'ias-system-module-file-upload-progress-manager',
  imports: [CommonModule],
  templateUrl: './system-module-file-upload-progress-manager.component.html',
  styleUrl: './system-module-file-upload-progress-manager.component.less',
  providers: [SystemTaskManagerFileBusiness],
})
export class SystemModuleFileUploadProgressManagerComponent
  implements OnInit, OnDestroy
{
  @Input() files: UploadControlFile[] = [];
  @Output() close = new EventEmitter<void>();

  constructor(private business: SystemTaskManagerFileBusiness) {}

  max = 5;
  progress = 0;
  private subscription = new Subscription();
  private trigger = new EventEmitter<FileProgress>();
  private datas = new Map<string, FileProgress>();
  get completed() {
    let count = 0;
    this.datas.forEach((data) => {
      if (data.progress >= 100) {
        count++;
      }
    });
    return count;
  }
  private waiting: UploadControlFile[] = [];
  private uplaoding: UploadControlFile[] = [];
  private handle?: NodeJS.Timeout;

  ngOnInit(): void {
    this.init();
    this.regist();
    this.load();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.datas.clear();
    if (this.handle) {
      clearInterval(this.handle);
      this.handle = undefined;
    }
  }

  private regist() {
    let sub = this.trigger.subscribe((data) => {
      this.datas.set(data.filename, data);
      let all = this.files.length;
      this.progress = 0;
      this.datas.forEach((data) => {
        this.progress += data.progress / all;
        if (data.progress > 100) {
          this.on.completed(data);
        }
      });
    });
    this.subscription.add(sub);
  }

  private init() {
    this.files.forEach((file) => {
      this.datas.set(file.filename, { filename: file.filename, progress: 0 });
    });
    this.waiting = [...this.files];
  }

  private load() {
    this.handle = setInterval(() => {
      if (this.waiting.length === 0) {
        if (this.uplaoding.length === 0) {
          if (this.handle) {
            clearInterval(this.handle);
            this.handle = undefined;
          }
        }
        return;
      }
      if (this.uplaoding.length < this.max) {
        while (this.uplaoding.length < this.max) {
          let file = this.waiting.shift();
          if (!file) break;
          this.uplaoding.push(file);
          this.business.upload(file, this.trigger);
          if (this.waiting.length === 0) {
            break;
          }
        }
      }
    }, 1);
  }

  on = {
    close: () => {
      this.close.emit();
    },
    completed: (data: FileProgress) => {
      let index = this.uplaoding.findIndex((x) => x.filename === data.filename);
      if (index >= 0) {
        this.uplaoding.splice(index, 1);
      }
    },
  };
}
