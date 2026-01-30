import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { SystemTaskFileDetailsMapManagerComponent } from '../system-task-file-details-map-manager/system-task-file-details-map-manager.component';
import { SystemTaskFileDetailsBusiness } from './system-task-file-details.business';

@Component({
  selector: 'ias-system-task-file-details',
  imports: [SystemTaskFileDetailsMapManagerComponent],
  templateUrl: './system-task-file-details.component.html',
  styleUrl: './system-task-file-details.component.less',
  providers: [SystemTaskFileDetailsBusiness],
})
export class SystemTaskFileDetailsComponent implements OnInit {
  @Input() data?: FileInfo;
  constructor(
    private business: SystemTaskFileDetailsBusiness,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  @ViewChild('video_element') set element(v: ElementRef) {
    if (v) {
      let video = v.nativeElement as HTMLVideoElement;
      let context = new AudioContext();
      let source = context.createMediaElementSource(video);
      let node = context.createGain();
      node.gain.value = 10;
      source.connect(node);
      node.connect(context.destination);
    }
  }

  src?: SafeResourceUrl;

  video = {
    time: 0,
    event: {
      time: new EventEmitter<number>(),
    },
  };

  ngOnInit(): void {}

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
  onmaploaded() {
    if (this.data) {
      this.load(this.data);
    }
  }

  ontimeupdate(e: Event) {
    let target = e.currentTarget as HTMLVideoElement;
    this.video.event.time.emit(target.currentTime * 1000);
  }
  onseek(data: { start: FileGpsItem; end: FileGpsItem; percent: number }) {
    let start = data.start.OffsetTime.toSeconds();
    let end = data.end.OffsetTime.toSeconds();
    let timestamp = start + (end - start) * data.percent;
    this.video.time = timestamp;
  }
  onvideoerror(e: Event) {
    if (!this.src) return;
    let target = e.currentTarget as HTMLVideoElement;
    let error = target.error;
    console.error(target.src, error);
    if (error) {
      let message = '视频加载失败';
      // switch (error.code) {
      //   case error.MEDIA_ERR_ABORTED:
      //     message = '视频加载被中止！';
      //     break;
      //   case error.MEDIA_ERR_NETWORK:
      //     message = '网络错误导致视频加载失败！';
      //     break;
      //   case error.MEDIA_ERR_DECODE:
      //     message = '视频解码失败！';
      //     break;
      //   case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
      //     message = '不支持的视频格式！';
      //     break;
      //   default:
      //     break;
      // }
      this.toastr.error(error.message, message);
    }
  }
  onerror(e: Error) {
    this.toastr.error(e.message);
  }
}
