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
import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { IASMapPanelSettingsComponent } from '../../map-panel/ias-map-panel-settings/ias-map-panel-settings.component';
import { IASMapAMapConfig } from '../../map/controller/amap/ias-map-amap.config';
import { IIASMapArgs, MapMarkerStyle } from '../../map/ias-map.model';
import { VideoPathMapController } from './controller/video-path-map.controller';
import { IVideoPathMapTriggerArgs } from './video-path-map.model';

@Component({
  selector: 'howell-video-path-map',
  imports: [CommonModule, IASMapPanelSettingsComponent],
  templateUrl: './video-path-map.component.html',
  styleUrl: './video-path-map.component.less',
})
export class VideoPathMapComponent implements OnChanges, OnInit, OnDestroy {
  @Input() datas: FileGpsItem[][] = [];
  @Input() points: GisPoint[] = [];
  @Input() args: IIASMapArgs = new MapMarkerStyle();
  @Input('to') _to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<IVideoPathMapTriggerArgs>();
  @Output() loaded = new EventEmitter<void>();
  @Output() error = new EventEmitter<Error>();
  @Input() loading = false;
  @Input() rectified = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();

  constructor() {}

  colors = IASMapAMapConfig.path.color;
  speed = 0;
  current?: FileGpsItem;
  private subscription = new Subscription();
  private controller = new VideoPathMapController(this.subscription);

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
      let sub_to = this._to.subscribe((time) => {
        this.controller.to(time).then((x) => {
          this.current = x;
        });
      });
      this.subscription.add(sub_to);
    }
    let sub_trigger = this.controller.trigger.subscribe((x) => {
      this.trigger.emit(x);
    });
    this.subscription.add(sub_trigger);
    let sub_speed = this.controller.speed.subscribe((x) => {
      this.speed = x ?? 0;
    });
    this.subscription.add(sub_speed);

    if (this.datas.length > 0) {
      this.load.path(this.datas);
    }
    if (this.points.length > 0) {
      this.load.point(this.points, this.args, this.datas.length == 0);
    }
  }

  load = {
    path: async (datas: FileGpsItem[][]) => {
      this.controller.path
        .load(datas, true)
        .then((x) => {
          this.loaded.emit();
        })
        .catch((e) => {
          this.error.emit(e);
        });
    },
    point: async (
      datas: GisPoint[],
      args: MapMarkerStyle,
      fitview: boolean = false
    ) => {
      try {
        let points = await this.controller.point.load(datas, args);
        if (fitview) {
          this.controller.fit.view();
        }
      } catch (e: any) {
        this.error.emit(e);
      }
    },
  };

  on = {
    rectified: () => {
      this.rectifiedChange.emit(this.rectified);
    },
  };

  ngOnDestroy(): void {
    this.controller.destroy();
    this.subscription.unsubscribe;
  }
}
