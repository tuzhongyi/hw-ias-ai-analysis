import { Component, EventEmitter, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { VideoPathMapComponent } from '../video-path-map/video-path-map.component';

import { CommonModule } from '@angular/common';
import { IVideoPathMapBusiness } from '../video-path-map/video-path-map.model';
import { IVideoPathArgs } from './video-path.model';

@Component({
  selector: 'howell-video-path',
  imports: [CommonModule, VideoPathMapComponent],
  templateUrl: './video-path.component.html',
  styleUrl: './video-path.component.less',
})
export class VideoPathComponent {
  @Input() path = '';
  @Input() args?: IVideoPathArgs;
  constructor(private toastr: ToastrService) {}
  src?: SafeResourceUrl;

  video = {
    time: 0,
    event: {
      time: new EventEmitter<number>(),
    },
  };
  map = {
    args: undefined as any,
    business: undefined as IVideoPathMapBusiness | undefined,
  };

  ngOnInit(): void {
    if (this.args) {
      this.map.business = this.args.business;
      this.map.args = this.args.args;
    }
  }

  private load(path: string) {
    this.src = path;
  }
  onmaploaded() {
    if (this.path) {
      this.load(this.path);
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
  onvideoerror(e: Event) {
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
  onerror(e: Error) {
    this.toastr.error(e.message);
  }
}
