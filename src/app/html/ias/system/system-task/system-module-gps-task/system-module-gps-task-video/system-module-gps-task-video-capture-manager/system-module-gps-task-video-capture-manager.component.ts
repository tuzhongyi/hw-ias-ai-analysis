import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { SystemModuleGpsTaskVideoCaptureContainerComponent } from '../system-module-gps-task-video-capture-container/system-module-gps-task-video-capture-container.component';
import { SystemModuleGpsTaskVideoUploadComponent } from '../system-module-gps-task-video-upload/system-module-gps-task-video-upload.component';

@Component({
  selector: 'ias-system-module-gps-task-video-capture-manager',
  imports: [
    CommonModule,
    SystemModuleGpsTaskVideoUploadComponent,
    SystemModuleGpsTaskVideoCaptureContainerComponent,
  ],
  templateUrl: './system-module-gps-task-video-capture-manager.component.html',
  styleUrl: './system-module-gps-task-video-capture-manager.component.less',
})
export class SystemModuleGpsTaskVideoCaptureManagerComponent {
  @Input() filename = '';
  @Input() data?: ArrayBuffer;
  @Output() save = new EventEmitter<{
    image: ArrayBuffer;
    location?: FileGpsItem;
  }>();
  @Output() close = new EventEmitter<void>();

  constructor() {}
  file?: FileInfo;
  image?: ArrayBuffer;
  location?: FileGpsItem;

  test() {
    let file = new FileInfo();
    file.FileName = '2025_08_04/quyang/C4_2025_08_01T10_12_19_L_100001.mkv';
    return file;
  }

  on = {
    file: (file: FileInfo) => {
      this.file = file;
    },
    capture: (image: ArrayBuffer) => {
      this.image = image;
    },
    location: (data: FileGpsItem) => {
      this.location = data;
    },
    save: () => {
      if (this.image) {
        this.save.emit({
          image: this.image,
          location: this.location,
        });
      }
    },
    close: () => {
      this.close.emit();
    },
  };
}
