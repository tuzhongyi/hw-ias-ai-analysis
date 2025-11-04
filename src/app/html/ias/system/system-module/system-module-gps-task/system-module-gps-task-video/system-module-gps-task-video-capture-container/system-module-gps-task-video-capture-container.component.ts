import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ContainerZoomComponent } from '../../../../../../../common/components/container-zoom/container-zoom.component';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { PromiseValue } from '../../../../../../../common/view-models/value.promise';
import { PictureComponent } from '../../../../../share/picture/component/picture.component';
import { SystemTaskFileDetailsMapManagerComponent } from '../../../../system-task/system-task-file/system-task-file-details-map-manager/system-task-file-details-map-manager.component';
import { SystemModuleGpsTaskVideoCaptureContainerBusiness } from './system-module-gps-task-video-capture-container.business';

@Component({
  selector: 'ias-system-module-gps-task-video-capture-container',
  imports: [
    CommonModule,
    SystemTaskFileDetailsMapManagerComponent,
    PictureComponent,
    ContainerZoomComponent,
  ],
  templateUrl:
    './system-module-gps-task-video-capture-container.component.html',
  styleUrl: './system-module-gps-task-video-capture-container.component.less',
  providers: [SystemModuleGpsTaskVideoCaptureContainerBusiness],
})
export class SystemModuleGpsTaskVideoCaptureContainerComponent {
  @Input() data!: FileInfo;
  @Output() capture = new EventEmitter<ArrayBuffer>();
  @Output() location = new EventEmitter<FileGpsItem>();

  constructor(
    private business: SystemModuleGpsTaskVideoCaptureContainerBusiness,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  private element = new PromiseValue<HTMLVideoElement>();
  @ViewChild('video_element') set _element(
    v: ElementRef<HTMLVideoElement> | undefined
  ) {
    if (v) {
      let video = v.nativeElement as HTMLVideoElement;
      this.element.set(video);
      let context = new AudioContext();
      let source = context.createMediaElementSource(video);
      let node = context.createGain();
      node.gain.value = 10;
      source.connect(node);
      node.connect(context.destination);
    }
  }

  private load(data: FileInfo) {
    this.business
      .path(data.FileName)
      .then((url) => {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      })
      .catch((e) => {
        this.toastr.error('加载失败');
      });
  }

  src?: SafeResourceUrl;

  video = {
    time: 0,
    event: {
      time: new EventEmitter<number>(),
    },
    on: {
      time: {
        update: (e: Event) => {
          let target = e.currentTarget as HTMLVideoElement;
          this.video.event.time.emit(target.currentTime * 1000);
        },
      },
      error: (e: Event) => {
        if (!this.src) return;
        let target = e.currentTarget as HTMLVideoElement;
        let error = target.error;
        console.error(target.src, error);
        if (error) {
          let message = '视频加载失败';

          this.toastr.error(error.message, message);
        }
      },
      capture: () => {
        this.element.get().then((video) => {
          let canvas = document.createElement('canvas');
          canvas.width = video.clientWidth;
          canvas.height = video.clientHeight;
          let context = canvas.getContext('2d') as CanvasRenderingContext2D;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          let image = canvas.toDataURL('image/png');
          this.picture.src = image;
          this.picture.reset = true;
          video.pause();
          canvas.toBlob((blob) => {
            if (blob) {
              blob.arrayBuffer().then((buffer) => {
                this.capture.emit(buffer);
              });
            }
          });
        });
      },
    },
  };

  map = {
    on: {
      loaded: () => {
        if (this.data) {
          this.load(this.data);
        }
      },
      seek: (item: FileGpsItem) => {
        let time = item.OffsetTime.toSeconds();
        this.video.time = time;
      },
      error: (e: Error) => {
        this.toastr.error(e.message);
      },
      current: (data: FileGpsItem) => {
        this.location.emit(data);
      },
    },
  };

  picture = {
    src: '',
    reset: true,
  };
}
