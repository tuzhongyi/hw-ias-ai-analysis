import { CommonModule } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';

import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';
import { WindowComponent } from '../../share/window/window.component';
import { SystemTaskFileDetailsComponent } from '../../system/system-task/system-task-shop/system-task-file/system-task-file-details/system-task-file-details.component';
import { ManagementRecordFileTableComponent } from '../management-record-file-table/management-record-file-table.component';
import { ManagementRecordFileManagerWindow } from './management-record-file-manager.window';

@Component({
  selector: 'ias-management-record-file-manager',
  imports: [
    CommonModule,
    WindowComponent,
    ManagementRecordFileTableComponent,
    SystemTaskFileDetailsComponent,
  ],
  templateUrl: './management-record-file-manager.component.html',
  styleUrl: './management-record-file-manager.component.less',
})
export class ManagementRecordFileManagerComponent {
  window = new ManagementRecordFileManagerWindow();
  history: (FileInfo | undefined)[] = [];
  folder?: FileInfo;
  nodes: string[] = [];
  private isback = false;

  table = {
    root: new EventEmitter<void>(),
    folder: new EventEmitter<string>(),
    refresh: new EventEmitter<void>(),
    onopen: (file: FileInfo) => {
      if (file === this.folder) {
        return;
      }
      this.folder = file;
      if (file) {
        this.nodes = file.FileName.split('/');
      } else {
        this.nodes = [];
      }
      if (this.isback) {
        this.isback = false;
        return;
      }
      this.history.push(file);
    },
    onvideo: (file: FileInfo) => {
      this.window.details.data = file;
      this.window.details.show = true;
    },
  };

  path = {
    root: () => {
      if (this.folder) {
        this.table.root.emit();
      }
    },
    folder: (filename: string) => {
      if (this.folder && this.folder.FileName === filename) {
        return;
      }
      this.table.folder.emit(filename);
    },
  };

  onback() {
    this.isback = true;
    this.history.pop();

    if (this.history.length > 0) {
      let last = this.history[this.history.length - 1];

      if (last) {
        this.table.folder.emit(last.FileName);
      } else {
        this.table.root.emit();
      }
    } else {
      this.table.root.emit();
    }
  }
  onup() {
    if (this.folder) {
      let nodes = this.folder.FileName.split('/');
      if (nodes.length > 1) {
        nodes.pop();
        let last = nodes.pop();
        if (last) {
          this.table.folder.emit(last);
        } else {
          this.table.root.emit();
        }
      } else {
        this.table.root.emit();
      }
    }
  }
  onrefresh() {
    this.table.refresh.emit();
  }
}
