import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { UploadControlComponent } from '../../../../../../../common/components/upload-control/upload-control.component';
import {
  UploadControlFile,
  UploadControlFileInfo,
} from '../../../../../../../common/components/upload-control/upload-control.model';
import { HowellPoint } from '../../../../../../../common/data-core/models/arm/point.model';
import { ConfigRequestService } from '../../../../../../../common/data-core/requests/services/config/config.service';
import { PictureBusiness } from '../../../../../share/picture/component/picture.business';
import { PicturePolygonComponent } from '../../../../../share/picture/picture-polygon/picture-polygon.component';
import { SystemModuleGpsTaskDetailsPictureSource } from './system-module-gps-task-details-picture.source';

@Component({
  selector: 'ias-system-module-gps-task-details-picture',
  imports: [
    CommonModule,
    FormsModule,
    ContainerZoomComponent,
    UploadControlComponent,
    PicturePolygonComponent,
    HowellSelectComponent,
  ],
  templateUrl: './system-module-gps-task-details-picture.component.html',
  styleUrl: './system-module-gps-task-details-picture.component.less',
  providers: [SystemModuleGpsTaskDetailsPictureSource, PictureBusiness],
})
export class SystemModuleGpsTaskDetailsPictureComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() url = '';
  @Input() position?: number;
  @Output() positionChange = new EventEmitter<number>();
  @Input() polygon: HowellPoint[] = [];
  @Output() filepicture = new EventEmitter<ArrayBuffer>();

  @Output() remove = new EventEmitter<void>();
  @Output() draw = new EventEmitter<string>();

  @Output() videocaptionopen = new EventEmitter<string>();
  @Output() videocaptionupload = new EventEmitter<ArrayBuffer>();
  @Input() videocapturecompleted?: EventEmitter<ArrayBuffer>;

  constructor(
    public source: SystemModuleGpsTaskDetailsPictureSource,
    private business: PictureBusiness,
    private config: ConfigRequestService
  ) {
    this.upload.accept.load();
  }

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
      let base64 = window.btoa(binary);
      return `data:image/png;base64,${base64}`;
    },
  };
  upload = {
    accept: {
      value: 'image/*',
      load: () => {
        this.config.video.then((config) => {
          let suffixes = config.upload.suffix.join(',');
          this.upload.accept.value = `image/*,${suffixes}`;
        });
      },
    },
  };

  private subscription = new Subscription();
  private regist() {
    if (this.videocapturecompleted) {
      let sub = this.videocapturecompleted.subscribe((data) => {
        this.image.src = this.image.convert(data);
        this.filepicture.emit(data);
      });
      this.subscription.add(sub);
    }
  }

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
  ngOnInit(): void {
    this.regist();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  on = {
    file: {
      mode: 'picture' as 'picture' | 'video',
      start: (info: UploadControlFileInfo) => {
        let suffix = info.filename.split('.').pop()?.toLowerCase();
        if (suffix) {
          this.config.video.then((config) => {
            let index = config.upload.suffix.indexOf(`.${suffix}`);
            if (index < 0) {
              this.on.file.mode = 'picture';
            } else {
              this.on.file.mode = 'video';
              info.size;
              this.videocaptionopen.emit(info.filename);
            }
          });
        }
      },
      upload: (file: UploadControlFile) => {
        let data = file.data as ArrayBuffer;
        switch (this.on.file.mode) {
          case 'picture':
            this.image.src = this.image.convert(data);
            this.filepicture.emit(data);
            break;
          case 'video':
            this.videocaptionupload.emit(data);
            break;

          default:
            break;
        }
      },
    },
    // upload: (data: UploadControlFile) => {
    //   this.image.src = this.image.convert(data.data as ArrayBuffer);
    //   this.file.emit(data);
    // },
    position: () => {
      this.positionChange.emit(this.position);
    },
    delete: () => {
      this.image.src = '';
      this.remove.emit();
    },
    draw: () => {
      this.draw.emit(this.image.src);
    },
    start: (info: UploadControlFileInfo) => {},
  };
}
