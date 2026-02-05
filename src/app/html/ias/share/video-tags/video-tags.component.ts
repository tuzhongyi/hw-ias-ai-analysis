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
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model';
import { FileTagItem } from '../../../../common/data-core/models/arm/file/file-tag-item.model';
import { VideoDirective } from '../../../../common/directives/video/video.directive';
import { wait } from '../../../../common/tools/wait';
import { VideoTagsBusiness } from './video-tags.business';

@Component({
  selector: 'ias-video-tags',
  imports: [CommonModule, VideoDirective],
  templateUrl: './video-tags.component.html',
  styleUrl: './video-tags.component.less',
  providers: [VideoTagsBusiness],
})
export class VideoTagsComponent implements OnInit, OnChanges, OnDestroy {
  @Input('load') _load?: EventEmitter<FileInfo>;
  @Input() capture?: EventEmitter<void>;
  @Input() time = 0;
  @Output() timeChange = new EventEmitter<number>();
  @Output() loaded = new EventEmitter<VideoDirective>();
  @Output() picture = new EventEmitter<ArrayBuffer>();
  @Input() keycontrol = false;
  constructor(
    private business: VideoTagsBusiness,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {}

  @ViewChild(VideoDirective) _video?: VideoDirective;

  src?: SafeResourceUrl;
  private subscription = new Subscription();
  ngOnChanges(changes: SimpleChanges): void {
    this.change.time(changes['time']);
  }
  ngOnInit(): void {
    this.regist();
    wait(() => {
      return !!this._video;
    }).then(() => {
      if (this._video) {
        this.loaded.emit(this._video);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private change = {
    time: (change: SimpleChange) => {
      if (change) {
        this.video.time = this.time;
      }
    },
  };

  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((x) => {
        this.load(x);
      });
      this.subscription.add(sub);
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
    this.business.tags(data.FileName).then((x) => {
      wait(() => {
        return this.video.duration > 0;
      }).then(() => {
        this.video.tags.clear();
        x.forEach((tag) => {
          let time = tag.OffsetTime.toSeconds();
          let percent = (time / (this.video.duration || 1)) * 100;
          this.video.tags.set(percent, tag);
        });
      });
    });
  }

  video = {
    playing: true,
    time: 0,
    duration: 0,
    control: {
      visible: true,
      timer: undefined as NodeJS.Timeout | undefined,
      show: () => {
        this.video.control.visible = true;
        if (this.video.control.timer) {
          clearTimeout(this.video.control.timer);
        }
      },
      hide: () => {
        clearTimeout(this.video.control.timer);

        this.video.control.timer = setTimeout(() => {
          if (this.video.playing) {
            this.video.control.visible = false;
          }
        }, 2500); // 和原生 controls 体感接近
      },
    },
    tags: new Map<number, FileTagItem>(),

    on: {
      play: () => {
        this.video.playing = true;
        this.video.control.hide();
      },
      pause: () => {
        this.video.playing = false;
        this.video.control.show();
      },
      seek: (data: FileTagItem) => {
        this.video.control.show();
        this.video.control.hide();
        this.video.time = data.OffsetTime.toSeconds();
        this._video?.pause();
      },
      loaded: (e: Event) => {
        let target = e.currentTarget as HTMLVideoElement;
        this.video.duration = target.duration;
      },
      update: (e: Event) => {
        let target = e.currentTarget as HTMLVideoElement;
        this.time = target.currentTime;
        this.timeChange.emit(this.time);
        // console.log('video time:', this.time);
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
      mouse: {
        move: () => {
          this.video.control.show();
          if (this.video.playing) {
            this.video.control.hide();
          }
        },
        leave: () => {
          if (this.video.playing) {
            this.video.control.visible = false;
          }
        },
      },
    },
  };
}
