import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ArmEventType } from '../../../../../common/data-core/enums/event/arm-event-type.enum';
import { RoadObjectEventType } from '../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectState } from '../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { FileGpsItem } from '../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { RoadObjectEventRecord } from '../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { GisPoint } from '../../../../../common/data-core/models/arm/gis-point.model';
import { PathTool } from '../../../../../common/tools/path-tool/path.tool';
import { SizeTool } from '../../../../../common/tools/size-tool/size.tool';
import { MapMarkerStyle } from '../../../share/map/ias-map.model';
import { VideoPathComponent } from '../../../share/video-path/component/video-path.component';
import { SystemEventVideoBusiness } from './business/system-event-video.business';
import { SystemEventVideoArgs } from './system-event-video.model';

@Component({
  selector: 'ias-system-event-video',
  imports: [CommonModule, VideoPathComponent],
  templateUrl: './system-event-video.component.html',
  styleUrl: './system-event-video.component.less',
  providers: [SystemEventVideoBusiness],
})
export class SystemEventVideoComponent implements OnInit, OnChanges {
  @Input() data?: MobileEventRecord | RoadObjectEventRecord;
  @Input() args: SystemEventVideoArgs = {};
  constructor(private business: SystemEventVideoBusiness) {}

  src?: string;
  map = {
    items: [] as FileGpsItem[][],
    loading: false,
    points: [] as GisPoint[],
    args: new MapMarkerStyle(),
    rectified: {
      value: false,
      change: (value: boolean) => {
        this.map.rectified.value = value;
        this.args.rectified = value;
        if (this.data) {
          this.load.path(this.data.Id, this.args);
        }
      },
    },
  };
  count = 5;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['args'] && !changes['args'].firstChange) {
      if (this.data) {
        this.src = this.business.file(this.data.Id, this.args);
      }
    }
  }

  ngOnInit(): void {
    if (this.data) {
      this.src = this.business.file(this.data.Id, this.args);
      this.load.path(this.data.Id, this.args);
      this.load.point(this.data);
    }
  }

  load = {
    point: (data: MobileEventRecord | RoadObjectEventRecord) => {
      let args = new MapMarkerStyle();

      if (data instanceof MobileEventRecord) {
        args.size = SizeTool.map.shop.get();
        switch (data.EventType) {
          case ArmEventType.ShopSignDisappeared:
            args.path = PathTool.image.map.shop.orange;

            break;
          case ArmEventType.ShopSignCreated:
            args.path = PathTool.image.map.shop.green;
            break;

          default:
            break;
        }
      } else if (data instanceof RoadObjectEventRecord) {
        args.size = SizeTool.map.object.get();
        let state = RoadObjectState.None;
        switch (data.EventType) {
          case RoadObjectEventType.Breakage:
            state = RoadObjectState.Breakage;
            break;
          case RoadObjectEventType.Inspection:
            state = RoadObjectState.Normal;
            break;
          case RoadObjectEventType.Disappear:
            state = RoadObjectState.Disappear;
            break;
          default:
            break;
        }

        args.path = PathTool.image.map.object.get(data.RoadObjectType, {
          state: state,
        });
      }
      this.map.args = args;

      if (data.Location) {
        this.map.points = [data.Location.GCJ02];
      }
    },
    path: (id: string, args: SystemEventVideoArgs) => {
      this.map.loading = true;
      this.business
        .load(id, args)
        .then((items) => {
          this.map.items = items;
          this.map.loading = false;
        })
        .catch((e) => {
          if (e.status === 404) {
            if (this.count > 0) {
              this.count--;
              setTimeout(() => {
                this.load.path(id, args);
              }, 1000);
            } else {
              this.map.loading = false;
            }
          } else {
            this.map.loading = false;
          }
        });
    },
  };
}
