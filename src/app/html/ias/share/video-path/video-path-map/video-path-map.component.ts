import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { IIASMapArgs, MapMarker } from '../../map/ias-map.model';
import { VideoPathMapAMapController } from './controller/amap/video-path-map-amap.controller';
import { VideoPathMapController } from './controller/video-path-map.controller';

@Component({
  selector: 'howell-video-path-map',
  imports: [CommonModule],
  templateUrl: './video-path-map.component.html',
  styleUrl: './video-path-map.component.less',
  providers: [VideoPathMapAMapController, VideoPathMapController],
})
export class VideoPathMapComponent implements OnChanges, OnInit, OnDestroy {
  @Input() datas: FileGpsItem[] = [];
  @Input() points: GisPoint[] = [];
  @Input() args: IIASMapArgs = new MapMarker();
  @Input('to') _to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<void>();
  @Output() error = new EventEmitter<Error>();
  @Input() loading = false;

  constructor(private controller: VideoPathMapController) {}

  speed = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datas'] && !changes['datas'].firstChange) {
      this.controller.path.clear().then(() => {
        if (this.datas.length > 0) {
          this.load.path(this.datas);
        }
      });
    }
    let load = false;
    if (changes['points'] && !changes['points'].firstChange) {
      load = true;
    }
    if (changes['args'] && !changes['args'].firstChange) {
      load = true;
    }
    if (load) {
      this.controller.point.clear().then(() => {
        if (this.points.length > 0) {
          this.load.point(this.points, this.args);
        }
      });
    }
  }

  ngOnInit(): void {
    if (this._to) {
      this._to.subscribe((x) => {
        this.controller.to(x);
      });
    }
    this.controller.trigger.subscribe((x) => {
      this.trigger.emit(x);
    });
    this.controller.speed.subscribe((x) => {
      this.speed = x ?? 0;
    });
    if (this.datas.length > 0) {
      this.load.path(this.datas);
    }
    if (this.points.length > 0) {
      this.load.point(this.points, this.args);
    }
  }

  load = {
    path: async (datas: FileGpsItem[]) => {
      this.controller.path
        .load(datas)
        .then((x) => {
          this.loaded.emit();
        })
        .catch((e) => {
          this.error.emit(e);
        });
    },
    point: (datas: GisPoint[], args: MapMarker) => {
      try {
        this.controller.point.load(datas, args);
      } catch (e: any) {
        this.error.emit(e);
      }
    },
  };

  ngOnDestroy(): void {
    this.controller.destroy();
  }
}
