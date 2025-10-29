import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { UploadControlComponent } from '../../../../../../../common/components/upload-control/upload-control.component';
import { UploadControlFile } from '../../../../../../../common/components/upload-control/upload-control.model';
import { SceneImage } from '../../../../../../../common/data-core/models/arm/analysis/llm/scene-Image.model';
import { PictureBusiness } from '../../../../../share/picture/component/picture.business';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { PictureCanvasDrawComponent } from '../../../../../share/picture/picture-canvas-draw/picture-canvas-draw.component';
import { SystemModuleGpsTaskDetailsPictureSource } from './system-module-gps-task-details-picture.source';

@Component({
  selector: 'ias-system-module-gps-task-details-picture',
  imports: [
    CommonModule,
    FormsModule,
    ContainerZoomComponent,
    UploadControlComponent,
    PictureComponent,
    PictureCanvasDrawComponent,
    HowellSelectComponent,
  ],
  templateUrl: './system-module-gps-task-details-picture.component.html',
  styleUrl: './system-module-gps-task-details-picture.component.less',
  providers: [SystemModuleGpsTaskDetailsPictureSource, PictureBusiness],
})
export class SystemModuleGpsTaskDetailsPictureComponent implements OnChanges {
  @Input() url = '';
  @Input() position?: number;
  @Output() positionChange = new EventEmitter<number>();
  @Output() dataChange = new EventEmitter<SceneImage>();
  @Output() file = new EventEmitter<ArrayBuffer>();
  @Output() remove = new EventEmitter<void>();

  constructor(
    public source: SystemModuleGpsTaskDetailsPictureSource,
    private business: PictureBusiness
  ) {}

  image = {
    src: '',
    load: (url: string) => {
      if (url) {
        this.image.src = this.business.load(url);
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

  private _change = {
    data: (simple: SimpleChange) => {
      if (simple) {
        this.image.load(this.url);
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this._change.data(changes['url']);
  }

  on = {
    upload: (data: UploadControlFile) => {
      this.image.src = this.image.convert(data.data as ArrayBuffer);
      this.file.emit(data.data as ArrayBuffer);
    },
    position: () => {
      this.positionChange.emit(this.position);
    },
    delete: () => {
      this.image.src = '';
      this.remove.emit();
    },
    draw: () => {
      this.draw.doing = !this.draw.doing;
    },
  };

  draw = {
    doing: false,
    do: () => {
      this.draw.doing = !this.draw.doing;
    },
  };
}
