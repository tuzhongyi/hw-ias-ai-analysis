import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { VideoDirective } from '../../../../../../common/directives/video/video.directive';
import { SystemTaskFileDetailsMapComponent } from '../system-task-file-details-map/system-task-file-details-map.component';
import { SystemTaskFileDetailsBusiness } from '../system-task-file-details/system-task-file-details.business';

@Component({
  selector: 'ias-system-task-file-details-multiple',
  imports: [CommonModule, SystemTaskFileDetailsMapComponent, VideoDirective],
  templateUrl: './system-task-file-details-multiple.component.html',
  styleUrl: './system-task-file-details-multiple.component.less',
  providers: [SystemTaskFileDetailsBusiness],
})
export class SystemTaskFileDetailsMultipleComponent
  implements OnInit, OnDestroy
{
  @Input() datas: FileInfo[] = [];
  constructor(
    private business: SystemTaskFileDetailsBusiness,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  private _videos?: QueryList<VideoDirective>;
  @ViewChildren(VideoDirective) set videos(list: QueryList<VideoDirective>) {
    console.log(list);
    this._videos = list;
  }
  get videos(): QueryList<VideoDirective> | undefined {
    return this._videos;
  }
  private handle: { keypress?: any } = {};

  ngOnInit(): void {
    this.regist();
    if (this.datas.length > 0) {
      this.map.data = this.datas[0];
    }
  }
  ngOnDestroy(): void {
    if (this.handle.keypress) {
      window.removeEventListener('keypress', this.handle.keypress);
      this.handle.keypress = undefined;
    }
  }

  private regist() {
    this.handle.keypress = this.on.key.press;
    window.addEventListener('keypress', this.handle.keypress);
  }

  private load(data: FileInfo) {
    return this.business.path(data.FileName).then((url) => {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  on = {
    key: {
      press: (e: KeyboardEvent) => {
        switch (e.code) {
          case 'Space':
            if (this.video.playing) {
              this.video.on.pause();
            } else {
              this.video.on.play();
            }
            break;

          default:
            break;
        }
      },
    },
  };

  map = {
    data: undefined as FileInfo | undefined,
    time: new EventEmitter<number>(),
    on: {
      loaded: async () => {
        let urls = [];
        for (let i = 0; i < this.datas.length; i++) {
          const item = this.datas[i];
          let url = await this.load(item);
          urls.push(url);
        }
        this.video.src = urls;
      },
      seek: (item: FileGpsItem) => {
        let time = item.OffsetTime.toSeconds();
        this.video.time = time;
      },
      error: (e: Error) => {
        this.toastr.error(e.message);
      },
    },
  };

  video = {
    src: [] as SafeResourceUrl[],
    time: 0,
    playing: true,
    on: {
      pause: (e?: Event) => {
        if (this.videos) {
          this.videos.forEach((video) => {
            video.pause();
            this.video.playing = false;
          });
        }
      },
      play: (e?: Event) => {
        if (this.videos) {
          this.videos.forEach((video) => {
            video.play();
            this.video.playing = true;
          });
        }
      },
      update: (e: Event, index: number) => {
        if (index === 0) {
          let target = e.currentTarget as HTMLVideoElement;
          this.map.time.emit(target.currentTime * 1000);
        }
      },
      seek: {
        changed: false,
        seeked: (e: Event) => {
          if (this.video.on.seek.changed) return;
          setTimeout(() => {
            this.video.on.seek.changed = false;
          }, 500);
          this.video.on.seek.changed = true;
          let target = e.currentTarget as HTMLVideoElement;
          this.video.time = target.currentTime;
        },
      },
      error: (e: Event) => {
        if (this.video.src.length == 0) return;
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
      },
    },
  };
}
