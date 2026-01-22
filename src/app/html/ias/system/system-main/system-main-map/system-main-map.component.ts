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
import { GpsTaskSampleRecord } from '../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { RoadObject } from '../../../../../common/data-core/models/arm/geographic/road-object.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ILocation } from '../../../../../common/data-core/models/model.interface';
import { Paged } from '../../../../../common/data-core/models/page-list.model';
import { wait } from '../../../../../common/tools/wait';
import { SystemMainMapBusiness } from './business/system-main-map.business';
import { SystemMainMapController } from './controller/system-main-map.controller';

@Component({
  selector: 'ias-system-main-map',
  imports: [],
  templateUrl: './system-main-map.component.html',
  styleUrl: './system-main-map.component.less',
  providers: [SystemMainMapBusiness, SystemMainMapController],
})
export class SystemMainMapComponent implements OnInit, OnChanges, OnDestroy {
  @Output() shopclick = new EventEmitter<ShopRegistration>();
  @Output() shopdblclick = new EventEmitter<ShopRegistration>();
  @Output() sampledblclick = new EventEmitter<GpsTaskSampleRecord>();
  @Output() devicedblclick = new EventEmitter<MobileDevice>();
  @Input() moveto?: EventEmitter<ILocation>;
  @Input() select?: EventEmitter<
    ShopRegistration | MobileEventRecord | GpsTaskSampleRecord
  >;
  @Input() over?: EventEmitter<ShopRegistration>;
  @Input() out?: EventEmitter<ShopRegistration>;
  @Input() shops: ShopRegistration[] = [];
  @Input() devices: MobileDevice[] = [];
  @Input() realtimes: MobileEventRecord[] = [];
  @Input() timeouts: MobileEventRecord[] = [];
  @Input() samples: GpsTaskSampleRecord[] = [];
  @Input() roadobjects: RoadObject[] = [];

  @Output() alarmvideo = new EventEmitter<MobileEventRecord>();
  @Output() alarmpicture = new EventEmitter<Paged<MobileEventRecord>>();
  @Input() heatmapload?: EventEmitter<ILocation[]>;
  @Input() heatmapdisplay = false;
  @Input() shopdisplay = true;
  @Input() devicedisplay = true;
  @Input() realtimedisplay = true;
  @Input() timeoutdisplay = true;
  @Input() sampledisplay = true;
  @Input() roadobjectdisplay = true;

  @Input() heatmaptext = true;

  constructor(
    private business: SystemMainMapBusiness,
    private controller: SystemMainMapController
  ) {}

  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist.all();
    this.load.road();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.shops(changes['shops']);
    this.change.devices(changes['devices']);
    this.change.realtimes(changes['realtimes']);
    this.change.timeouts(changes['timeouts']);
    this.change.samples(changes['samples']);
    this.change.roadobjects(changes['roadobjects']);

    this.change.display.shop(changes['shopdisplay']);
    this.change.display.device(changes['devicedisplay']);
    this.change.display.realtime(changes['realtimedisplay']);
    this.change.display.timeout(changes['timeoutdisplay']);
    this.change.display.sample(changes['sampledisplay']);
    this.change.display.heatmap(changes['heatmapdisplay']);
    this.change.display.roadobject(changes['roadobjectdisplay']);
    this.change.heatmap.text(changes['heatmaptext']);
  }
  ngOnDestroy(): void {
    this.controller.map.destory();
    this.subscription.unsubscribe();
  }
  private change = {
    shops: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.shop(this.shops);
      }
    },
    devices: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.device(this.devices);
      }
    },
    realtimes: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.realtimes(this.realtimes);
      }
    },
    timeouts: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.timeouts(this.timeouts);
      }
    },
    samples: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.samples(this.samples);
      }
    },
    roadobjects: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.roadobject(this.roadobjects);
      }
    },
    display: {
      shop: (simple: SimpleChange) => {
        if (simple) {
          wait(() => {
            return this.controller.shop.inited;
          }).then(() => {
            if (this.shopdisplay) {
              this.controller.shop.reload();
            } else {
              this.controller.shop.clear();
            }
          });
        }
      },
      device: (simple: SimpleChange) => {
        if (simple) {
          wait(() => {
            return this.controller.device.inited;
          }).then(() => {
            if (this.devicedisplay) {
              this.controller.device.reload();
            } else {
              this.controller.device.clear();
            }
          });
        }
      },
      realtime: (simple: SimpleChange) => {
        if (simple) {
          wait(() => {
            return this.controller.alarm.realtime.inited;
          }).then(() => {
            if (this.realtimedisplay) {
              this.controller.alarm.realtime.reload();
            } else {
              this.controller.alarm.realtime.clear();
            }
          });
        }
      },
      timeout: (simple: SimpleChange) => {
        if (simple) {
          wait(() => {
            return this.controller.alarm.timeout.inited;
          }).then(() => {
            if (this.realtimedisplay) {
              this.controller.alarm.timeout.reload();
            } else {
              this.controller.alarm.timeout.clear();
            }
          });
        }
      },
      sample: (simple: SimpleChange) => {
        if (simple) {
          wait(() => {
            return this.controller.sample.inited;
          }).then(() => {
            if (this.sampledisplay) {
              this.controller.sample.reload();
            } else {
              this.controller.sample.clear();
            }
          });
        }
      },
      heatmap: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          if (this.heatmapdisplay) {
            this.controller.heatmap.load([]);
          } else {
            this.controller.heatmap.clear();
          }
        }
      },
      roadobject: (simple: SimpleChange) => {
        if (simple) {
          wait(() => {
            return this.controller.roadobject.inited;
          }).then(() => {
            if (this.roadobjectdisplay) {
              this.controller.roadobject.reload();
            } else {
              this.controller.roadobject.clear();
            }
          });
        }
      },
    },
    heatmap: {
      text: (simple: SimpleChange) => {
        if (simple && !simple.firstChange) {
          this.controller.heatmap.set.text(this.heatmaptext);
        }
      },
    },
  };
  private load = {
    road: () => {
      this.business.road.load().then((datas) => {
        this.controller.road.load(datas).then((lines) => {
          this.controller.map.focus(lines);
        });
      });
    },
    shop: (datas: ShopRegistration[]) => {
      this.controller.shop.clear().then((x) => {
        this.controller.shop.load(datas);
      });
    },
    device: (datas: MobileDevice[]) => {
      this.controller.device.clear().then((x) => {
        this.controller.device.load(datas);
      });
    },
    realtimes: (datas: MobileEventRecord[]) => {
      this.controller.alarm.realtime.clear().then((x) => {
        this.controller.alarm.realtime.load(datas);
      });
    },
    timeouts: (datas: MobileEventRecord[]) => {
      this.controller.alarm.timeout.clear().then((x) => {
        this.controller.alarm.timeout.load(datas);
      });
    },
    samples: (datas: GpsTaskSampleRecord[]) => {
      this.controller.sample.clear().then((x) => {
        this.controller.sample.load(datas);
      });
    },
    roadobject: (datas: RoadObject[]) => {
      this.controller.roadobject.load(datas);
    },
  };
  private regist = {
    all: () => {
      this.regist.shop();
      this.regist.map();
      this.regist.alarm();
      this.regist.heatmap();
      this.regist.sample();
      this.regist.device();
    },
    heatmap: () => {
      if (this.heatmapload) {
        let sub = this.heatmapload.subscribe((data) => {
          this.controller.heatmap.load(data);
        });
        this.subscription.add(sub);
      }
    },
    alarm: () => {
      this.controller.alarm.realtime.event.video.subscribe((data) => {
        this.alarmvideo.emit(data);
      });
      this.controller.alarm.realtime.event.picture.subscribe((data) => {
        this.alarmpicture.emit(data);
      });
      this.controller.alarm.timeout.event.video.subscribe((data) => {
        this.alarmvideo.emit(data);
      });
      this.controller.alarm.timeout.event.picture.subscribe((data) => {
        this.alarmpicture.emit(data);
      });
    },
    map: () => {
      if (this.moveto) {
        let sub = this.moveto.subscribe((x) => {
          if (x.Location) {
            this.controller.map.moveto([
              x.Location.GCJ02.Longitude,
              x.Location.GCJ02.Latitude,
            ]);
          }
        });
        this.subscription.add(sub);
      }
      if (this.select) {
        let sub = this.select.subscribe((x) => {
          if (x instanceof ShopRegistration) {
            this.controller.shop.focus(x);
          } else if (x instanceof MobileEventRecord) {
            this.controller.alarm.realtime.select(x);
            this.controller.alarm.timeout.select(x);
          }
        });
        this.subscription.add(sub);
      }
    },
    shop: () => {
      if (this.over) {
        let sub = this.over.subscribe((x) => {
          this.controller.shop.over(x);
        });
        this.subscription.add(sub);
      }
      if (this.out) {
        let sub = this.out.subscribe((x) => {
          this.controller.shop.out(x);
        });
        this.subscription.add(sub);
      }
      this.controller.shop.event.click.subscribe((x) => {
        this.shopclick.emit(x);
      });
      this.controller.shop.event.dblclick.subscribe((x) => {
        this.shopdblclick.emit(x);
      });
    },
    sample: () => {
      this.controller.sample.event.dblclick.subscribe((x) => {
        this.sampledblclick.emit(x);
      });
    },
    device: () => {
      this.controller.device.event.dblclick.subscribe((x) => {
        this.devicedblclick.emit(x);
      });
    },
  };
}
