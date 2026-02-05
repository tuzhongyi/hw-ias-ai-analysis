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
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileGpsItem } from '../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../../common/data-core/models/arm/file/file-info.model';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemModuleRoadObjectVideoMapController } from './controller/system-module-road-object-video-map.controller';
import { SystemModuleRoadObjectVideoMapBusiness } from './system-module-road-object-video-map-container.business';

@Component({
  selector: 'ias-system-module-road-object-video-map-container',
  imports: [CommonModule],
  templateUrl: './system-module-road-object-video-map-container.component.html',
  styleUrl: './system-module-road-object-video-map-container.component.less',
  providers: [SystemModuleRoadObjectVideoMapBusiness],
})
export class SystemModuleRoadObjectVideoMapContainerComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() objects: RoadObject[] = [];
  @Input() data?: FileInfo;
  @Input('to') _to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<{
    start: FileGpsItem;
    end: FileGpsItem;
    percent: number;
  }>();
  @Output() loaded = new EventEmitter<FileGpsItem[]>();
  @Output() error = new EventEmitter<Error>();

  @Input() rectified = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();

  @Input() location?: [number, number];
  @Output() locationChange = new EventEmitter<[number, number]>();

  @Input() pickupable = false;
  @Input() pickup?: [number, number];
  @Output() pickupChange = new EventEmitter<[number, number]>();

  @Output() current = new EventEmitter<FileGpsItem>();

  constructor(private business: SystemModuleRoadObjectVideoMapBusiness) {}

  loading = false;
  hasdata = false;
  private time = {
    current: 0,
  };
  private subscription = new Subscription();
  private controller = new SystemModuleRoadObjectVideoMapController(
    this.subscription
  );

  ngOnInit(): void {
    if (this._to) {
      this._to.subscribe((time) => {
        this.time.current = time;
        this.controller.to(time).then((x) => {
          this.current.emit(x);
        });
      });
    }
    this.controller.event.trigger.subscribe((x) => {
      this.trigger.emit(x);
    });
    this.controller.event.position.subscribe((x) => {
      this.location = x;
      this.locationChange.emit(this.location);
    });
    this.controller.event.point.subscribe((x) => {
      this.pickup = x;
      this.pickupChange.emit(this.pickup);
    });

    if (this.data) {
      this.load.gps(this.data, this.rectified);
    }
  }

  load = {
    gps: async (data: FileInfo, rectified: boolean) => {
      try {
        this.loading = true;
        let datas = await this.business.gps(data.FileName, rectified);
        this.hasdata = datas.length > 0;
        this.loaded.emit(datas);
        if (this.hasdata) {
          await this.controller.path.load(datas);
        }
      } catch (e: any) {
        this.error.emit(e);
      } finally {
        this.loading = false;
      }
    },
    objects: (datas: RoadObject[]) => {
      this.controller.object.load(datas);
      this.controller.pickup.clear();
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.rectified(changes['rectified']);
    this.change.pickup(changes['pickupable']);
    this.change.objects(changes['objects']);
  }

  change = {
    rectified: (simple: SimpleChange) => {
      if (simple) {
        this.controller.path.clear().then((x) => {
          if (this.data) {
            this.business
              .gps(this.data.FileName, this.rectified)
              .then((datas) => {
                this.controller.path.load(datas);
                if (this.time.current) {
                  this.controller.to(this.time.current);
                }
              });
          }
        });
      }
    },
    pickup: (simple: SimpleChange) => {
      if (simple) {
        this.controller.pickup.can(this.pickupable);
        if (!this.pickupable) {
          this.controller.pickup.clear();
        }
      }
    },
    objects: (simple: SimpleChange) => {
      if (simple) {
        this.load.objects(this.objects);
      }
    },
  };

  ngOnDestroy(): void {
    this.controller.destroy();
    this.subscription.unsubscribe();
  }
}
