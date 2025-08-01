import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { VideoPathMapComponent } from '../video-path-map/video-path-map.component';

import { CommonModule } from '@angular/common';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { IIASMapArgs, MapMarker } from '../../map/ias-map.model';

@Component({
  selector: 'howell-video-path',
  imports: [CommonModule, VideoPathMapComponent],
  templateUrl: './video-path.component.html',
  styleUrl: './video-path.component.less',
})
export class VideoPathComponent implements OnChanges {
  @Input() src?: string;
  @Input() path: FileGpsItem[] = [];
  @Input() args: IIASMapArgs = new MapMarker();
  @Input() loading = false;
  @Input() points: GisPoint[] = [];
  @Input() rectified = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();

  constructor(private toastr: ToastrService) {}

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

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.change.src(changes['src']);
  }
  private change = {
    src: (change: SimpleChange) => {
      if (change) {
        if (this.src) {
          this.video.src = this.src;
        }
      }
    },
  };

  video = {
    src: undefined as SafeResourceUrl | undefined,
    time: 0,
    playing: false,
    event: {
      time: new EventEmitter<number>(),
    },
    init: () => {},
    on: {
      time: {
        update: (e: Event) => {
          let target = e.currentTarget as HTMLVideoElement;
          this.video.event.time.emit(target.currentTime * 1000);
        },
      },
      seek: (item: FileGpsItem) => {
        let time = item.OffsetTime.toSeconds();
        this.video.time = time;
      },
      error: (e: Event) => {
        if (!this.video.src) return;
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

  map = {
    on: {
      loaded: () => {},
      error: (e: Error) => {
        this.toastr.error('地图加载失败');
        console.error(e);
      },
      rectified: () => {
        this.rectifiedChange.emit(this.rectified);
      },
    },
  };
}
