import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GisPoint } from '../../../../../../common/data-core/models/arm/gis-point.model';
import {
  MapMarkerColor,
  MapMarkerType,
} from '../../../../share/map/ias-map.model';
import { VideoPathComponent } from '../../../../share/video-path/component/video-path.component';
import { SystemTaskVideoBusiness } from './system-task-video.business';
import { SystemTaskVideoArgs } from './system-task-video.model';

@Component({
  selector: 'ias-system-task-video',
  imports: [CommonModule, VideoPathComponent],
  templateUrl: './system-task-video.component.html',
  styleUrl: './system-task-video.component.less',
  providers: [SystemTaskVideoBusiness],
})
export class SystemTaskVideoComponent implements OnChanges {
  @Input() args?: SystemTaskVideoArgs;

  constructor(private business: SystemTaskVideoBusiness) {}

  src?: string;
  map = {
    items: [] as FileGpsItem[],
    loading: false,
    points: [] as GisPoint[],
    rectified: {
      value: false,
      change: (value: boolean) => {
        this.map.rectified.value = value;
        if (this.args) {
          this.load.gps(this.args, value);
        }
      },
    },
    args: {
      type: MapMarkerType.shop,
      color: MapMarkerColor.green,
    },
  };
  count = 5;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['args'] && !changes['args'].firstChange) {
      if (this.args) {
        this.load.video(this.args);
        this.load.gps(this.args, this.map.rectified.value);
        this.load.point(this.args);
      }
    }
  }

  ngOnInit(): void {
    if (this.args) {
      this.load.video(this.args);
      this.load.gps(this.args, this.map.rectified.value);
      this.load.point(this.args);
    }
  }

  load = {
    video: (args: SystemTaskVideoArgs) => {
      this.src = this.business.file(args);
    },
    gps: (args: SystemTaskVideoArgs, rectified?: boolean) => {
      this.map.loading = true;
      this.business
        .load(args, rectified)
        .then((items) => {
          this.map.items = items;
          this.map.loading = false;
        })
        .catch((e) => {
          if (e.status === 404) {
            if (this.count > 0) {
              this.count--;
              setTimeout(() => {
                this.load.gps(args, rectified);
              }, 1000);
            } else {
              this.map.loading = false;
            }
          } else {
            this.map.loading = false;
          }
        });
    },
    point: (item: SystemTaskVideoArgs) => {
      if (item.Point) {
        if (item.Detected != undefined) {
          this.map.args.color = item.Detected
            ? MapMarkerColor.blue
            : MapMarkerColor.orange;
        }
        this.map.points = [item.Point];
      }
    },
  };
}
