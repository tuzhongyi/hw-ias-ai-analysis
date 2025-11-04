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
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../common/data-core/models/arm/file/file-info.model';
import { VideoDirective } from '../../../../../../../common/directives/video/video.directive';
import { SystemTaskFileDetailsMapManagerComponent } from '../system-task-file-details-map-manager/system-task-file-details-map-manager.component';
import { SystemTaskFileDetailsBusiness } from '../system-task-file-details/system-task-file-details.business';

@Component({
  selector: 'ias-system-task-file-details-multiple',
  imports: [
    CommonModule,
    SystemTaskFileDetailsMapManagerComponent,
    VideoDirective,
  ],
  templateUrl: './system-task-file-details-multiple.component.html',
  styleUrl: './system-task-file-details-multiple.component.less',
  providers: [SystemTaskFileDetailsBusiness],
})
export class SystemTaskFileDetailsMultipleComponent
  implements OnInit, OnDestroy
{
  @Input() datas: FileInfo[] = [];
  @Input() task?: AnalysisTask;
  constructor(
    private business: SystemTaskFileDetailsBusiness,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  private _videos?: QueryList<VideoDirective>;
  @ViewChildren(VideoDirective) set videos(list: QueryList<VideoDirective>) {
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
      window.removeEventListener('keydown', this.handle.keypress);
      this.handle.keypress = undefined;
    }
  }

  private regist() {
    this.handle.keypress = this.on.key.press;
    window.addEventListener('keydown', this.handle.keypress);
  }

  private load(data: FileInfo) {
    return this.business.path(data.FileName).then((url) => {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  on = {
    key: {
      press: (e: KeyboardEvent) => {
        if (e.target instanceof HTMLInputElement) {
          return;
        }

        let time = this.videos?.first.currentTime;
        switch (e.code) {
          case 'Space':
            if (this.video.playing) {
              this.video.on.pause();
            } else {
              this.video.on.play();
            }
            break;
          case 'ArrowLeft':
            if (this.video.playing) {
              this.video.on.pause();
            }

            if (time != undefined) {
              time -= 1 / 3;
              this.video.time = time;
            }

            break;
          case 'ArrowRight':
            if (this.video.playing) {
              this.video.on.pause();
            }
            if (time != undefined) {
              time += 1 / 3;
              this.video.time = time;
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
    sync: true,
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
          if (!this.video.sync) return;
          if (this.video.on.seek.changed) return;
          setTimeout(() => {
            this.video.on.seek.changed = false;
          }, 1000);
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

          console.error(target.src, error);
          this.toastr.error(error.message, message);
        }
      },
    },
  };
}
