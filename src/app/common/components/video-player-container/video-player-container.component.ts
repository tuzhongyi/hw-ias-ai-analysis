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

import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DateTimePickerView } from '../../directives/date-time-picker/date-time-picker.directive';
import { DateTimeTool } from '../../tools/date-time-tool/datetime.tool';
import { ObjectTool } from '../../tools/object-tool/object.tool';
import { TimeDurationModel } from '../time-control/time-control.model';
import { VideoPlayerHeaderComponent } from '../video-player-header/video-player-header.component';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { PlayMode, VideoModel } from '../video-player/video-player.model';
import { WindowComponent } from '../window-control/window.component';
import { VideoPlayerContainerBusiness } from './video-player-container.business';
import {
  IVideoArgs,
  PlaybackArgs,
  PreviewArgs,
} from './video-player-container.model';

@Component({
  selector: 'howell-video-player-container',
  imports: [CommonModule, VideoPlayerComponent, VideoPlayerHeaderComponent],
  templateUrl: './video-player-container.component.html',
  styleUrls: ['./video-player-container.component.less'],
  providers: [VideoPlayerContainerBusiness],
})
export class VideoPlayerContainerComponent
  extends WindowComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() args?: IVideoArgs;
  @Input() autoplay = false;
  @Input() index = 0;
  @Input() headable = false;
  @Output() error = new EventEmitter<Error>();
  @Output() playing = new EventEmitter<void>();
  @Output() stoping = new EventEmitter<void>();

  constructor(
    private business: VideoPlayerContainerBusiness,
    private toastr: ToastrService,
  ) {
    super();
    this.business = business;
    let duration = DateTimeTool.beforeOrAfter(this.date, 15);
    this.duration = new TimeDurationModel(duration.begin, duration.end);
  }

  PlayMode = PlayMode;
  DateTimePickerView = DateTimePickerView;
  stop = new EventEmitter<void>();

  video = {
    mode: PlayMode.live,
    data: undefined as VideoModel | undefined,
    on: {
      playing: () => {
        this.playing.emit();
      },
      stop: () => {
        this.stoping.emit();
      },
    },
  };

  date: Date = new Date();
  duration: TimeDurationModel;

  webUrl?: string;

  private change = {
    args: (change: SimpleChange) => {
      if (change) {
        if (this.args instanceof PreviewArgs) {
          this.load.preview(this.args);
        } else if (this.args instanceof PlaybackArgs) {
          this.load.playback(this.args);
        } else if (!this.args) {
        } else {
          console.error("video-player-container's args is error:", this.args);
        }
      }
    },
  };

  private load = {
    preview: (args: PreviewArgs) => {
      this.business
        .load(args.deviceId, args.channelId, PlayMode.live)
        .then((x) => {
          this.video.data = x;
        })
        .catch((e) => {
          let message = e.message;
          if (
            e.error &&
            e.error.InnerException &&
            e.error.InnerException.Message
          ) {
            message = e.error.InnerException.Message;
          }
          this.toastr.error(message);
          this.error.emit(e);
        });
    },
    playback: (args: PlaybackArgs) => {
      this.business
        .load(args.deviceId, args.channelId, PlayMode.vod, args.duration)
        .then((x) => {
          this.video.data = x;
        })
        .catch((e) => {
          let message = e.message;
          if (
            e.error &&
            e.error.InnerException &&
            e.error.InnerException.Message
          ) {
            message = e.error.InnerException.Message;
          }
          this.toastr.error(message);
          this.error.emit(e);
        });
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.args(changes['args']);
  }

  ngOnDestroy(): void {
    this.video.data = undefined;
  }

  on = {
    close: () => {
      this.stop.emit();
      this.close.emit();
    },
    mode: (value: PlayMode) => {
      if (!this.args) return;
      this.video.mode = value;
      if (this.video.mode == PlayMode.live) {
        let args = ObjectTool.assign(this.args, PreviewArgs);
        this.load.preview(args);
      }
    },
    playback: () => {
      if (!this.args) return;
      let args = ObjectTool.assign(this.args, PlaybackArgs);
      args.duration = {
        begin: new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          this.date.getDate(),
          this.duration.begin.hour.value,
          this.duration.begin.minute.value,
          this.duration.begin.second.value,
        ),
        end: new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          this.date.getDate(),
          this.duration.end.hour.value,
          this.duration.end.minute.value,
          this.duration.end.second.value,
        ),
      };
      this.load.playback(args);
    },
    preview: () => {},
  };
}
