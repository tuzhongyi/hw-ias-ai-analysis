import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FileGpsItem } from '../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { SystemTaskFileDetailsMapComponent } from '../system-task-file-details-map/system-task-file-details-map.component';
import { SystemTaskFileDetailsBusiness } from './system-task-file-details.business';

@Component({
  selector: 'ias-system-task-file-details',
  imports: [ContentHeaderComponent, SystemTaskFileDetailsMapComponent],
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

  src?: SafeResourceUrl;

  video = {
    time: 0,
    event: {
      time: new EventEmitter<number>(),
    },
  };

  ngOnInit(): void {}

  private load(data: FileInfo) {
    this.business.path(data.FileName).then((url) => {
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
  onseek(item: FileGpsItem) {
    let time = item.OffsetTime.toSeconds();
    this.video.time = time;
  }
  onerror(e: Event) {
    if (!this.src) return;
    let target = e.currentTarget as HTMLVideoElement;
    let error = target.error;

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
      this.toastr.error(message);
    }
  }
}
