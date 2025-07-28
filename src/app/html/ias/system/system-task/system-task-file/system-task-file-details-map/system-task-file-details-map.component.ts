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
import { Subscription } from 'rxjs';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { AMapInputTipItem } from '../../../../../../common/helper/map/amap.model';
import { SystemTaskFileDetailsMapGPSBusiness } from './business/system-task-file-details-map-gps.business';
import { SystemTaskFileDetailsMapShopBusiness } from './business/system-task-file-details-map-shop.business';
import { SystemTaskFileDetailsMapBusiness } from './business/system-task-file-details-map.business.js';
import { SystemTaskFileDetailsAMapController } from './controller/system-task-file-details-amap.controller';
import { SystemTaskFileDetailsMapController } from './controller/system-task-file-details-map.controller';

@Component({
  selector: 'ias-system-task-file-details-map',
  imports: [CommonModule],
  templateUrl: './system-task-file-details-map.component.html',
  styleUrl: './system-task-file-details-map.component.less',
  providers: [
    SystemTaskFileDetailsAMapController,
    SystemTaskFileDetailsMapController,
    SystemTaskFileDetailsMapGPSBusiness,
    SystemTaskFileDetailsMapShopBusiness,
    SystemTaskFileDetailsMapBusiness,
  ],
})
export class SystemTaskFileDetailsMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() data?: FileInfo;
  @Input() task?: AnalysisTask;
  @Input('to') _to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<FileGpsItem[]>();
  @Output() error = new EventEmitter<Error>();

  @Input() speed = 0;
  @Output() speedChange = new EventEmitter<number>();

  @Input() rectified = false;
  @Output() rectifiedChange = new EventEmitter<boolean>();

  @Input() location?: [number, number];
  @Output() locationChange = new EventEmitter<[number, number]>();

  @Input() pickupable = false;
  @Input() pickup?: [number, number];
  @Output() pickupChange = new EventEmitter<[number, number]>();

  @Input() tips: AMapInputTipItem[] = [];
  @Input() tipover?: EventEmitter<AMapInputTipItem>;
  @Input() tipout?: EventEmitter<AMapInputTipItem>;
  @Input() tipclick?: EventEmitter<AMapInputTipItem>;

  @Input() copied: [number, number][] = [];

  constructor(
    private business: SystemTaskFileDetailsMapBusiness,
    private controller: SystemTaskFileDetailsMapController
  ) {}

  loading = false;
  hasdata = false;
  private time = {
    current: 0,
  };
  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._to) {
      this._to.subscribe((x) => {
        this.time.current = x;
        this.controller.to(x);
      });
    }
    this.controller.event.trigger.subscribe((x) => {
      this.trigger.emit(x);
    });
    this.controller.event.speed.subscribe((x) => {
      this.speed = x ?? 0;
      this.speedChange.emit(this.speed);
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
    if (this.task) {
      this.load.shop(this.task);
    }
    this.regist.load();
  }
  private regist = {
    load: () => {
      this.regist.tip.over();
      this.regist.tip.out();
      this.regist.tip.click();
    },
    tip: {
      over: () => {
        if (this.tipover) {
          let sub = this.tipover.subscribe((x) => {
            this.controller.tips.trigger.over(x);
          });
          this.subscription.add(sub);
        }
      },
      out: () => {
        if (this.tipout) {
          let sub = this.tipout.subscribe((x) => {
            this.controller.tips.trigger.out(x);
          });
          this.subscription.add(sub);
        }
      },
      click: () => {
        if (this.tipclick) {
          let sub = this.tipclick.subscribe((x) => {
            this.controller.tips.trigger.select(x);
            if (x.location) {
              this.controller.map.center(x.location);
            }
          });
          this.subscription.add(sub);
        }
      },
    },
  };

  load = {
    gps: async (data: FileInfo, rectified: boolean) => {
      try {
        this.loading = true;
        let datas = await this.business.gps.load(data.FileName, rectified);
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
    shop: (task: AnalysisTask) => {
      this.business.shop.load(task.Id).then((x) => {
        this.controller.detect.load(x);
      });
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.rectified(changes['rectified']);
    this.change.tips(changes['tips']);
    this.change.pickup(changes['pickupable']);
    this.change.cipied(changes['copied']);
  }

  change = {
    rectified: (simple: SimpleChange) => {
      if (simple) {
        this.controller.path.clear().then((x) => {
          if (this.data) {
            this.business.gps
              .load(this.data.FileName, this.rectified)
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
    tips: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.controller.tips.clear().then((x) => {
          this.controller.tips.load(this.tips);
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
    cipied: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.controller.copied.load(this.copied);
      }
    },
  };

  ngOnDestroy(): void {
    this.controller.destroy();
    this.subscription.unsubscribe();
  }
}
