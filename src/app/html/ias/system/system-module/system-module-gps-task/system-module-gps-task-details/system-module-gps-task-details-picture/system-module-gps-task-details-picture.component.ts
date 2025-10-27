import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { UploadControlComponent } from '../../../../../../../common/components/upload-control/upload-control.component';
import { UploadControlFile } from '../../../../../../../common/components/upload-control/upload-control.model';
import { SceneImage } from '../../../../../../../common/data-core/models/arm/analysis/llm/scene-Image.model';
import { PictureBusiness } from '../../../../../share/picture/component/picture.business';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { SystemModuleGpsTaskDetailsPictureArgs } from './system-module-gps-task-details-picture.model';
import { SystemModuleGpsTaskDetailsPictureSource } from './system-module-gps-task-details-picture.source';

@Component({
  selector: 'ias-system-module-gps-task-details-picture',
  imports: [
    CommonModule,
    FormsModule,
    ContainerZoomComponent,
    UploadControlComponent,
    PictureComponent,
  ],
  templateUrl: './system-module-gps-task-details-picture.component.html',
  styleUrl: './system-module-gps-task-details-picture.component.less',
  providers: [SystemModuleGpsTaskDetailsPictureSource, PictureBusiness],
})
export class SystemModuleGpsTaskDetailsPictureComponent implements OnInit {
  @Input() index = 0;
  @Input() data = new SceneImage();
  @Output() change = new EventEmitter<SystemModuleGpsTaskDetailsPictureArgs>();
  @Output() remove = new EventEmitter<number>();

  constructor(
    public source: SystemModuleGpsTaskDetailsPictureSource,
    private business: PictureBusiness
  ) {}

  image = {
    src: '',
    load: (data: SceneImage) => {
      if (data.ImageUrl) {
        this.image.src = this.business.load(data.ImageUrl);
      }
    },
    convert: (data: ArrayBuffer) => {
      var binary = '';
      var bytes = new Uint8Array(data);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return `data:image/png;base64,${window.btoa(binary)}`;
    },
  };

  ngOnInit(): void {
    this.image.load(this.data);
  }

  on = {
    upload: (data: UploadControlFile) => {
      this.image.src = this.image.convert(data.data as ArrayBuffer);
      let args: SystemModuleGpsTaskDetailsPictureArgs = {
        index: this.index,
        data: data.data as ArrayBuffer,
        position: this.data.PositionNo,
      };
      this.change.emit(args);
    },
    delete: () => {
      this.image.src = '';
      this.remove.emit(this.index);
    },
    draw: () => {},
  };
}
