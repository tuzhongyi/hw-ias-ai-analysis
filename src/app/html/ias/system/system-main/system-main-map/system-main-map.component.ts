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
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ILocation } from '../../../../../common/data-core/models/model.interface';
import { Paged } from '../../../../../common/data-core/models/page-list.model';
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
  @Output() itemclick = new EventEmitter<ShopRegistration>();
  @Output() itemdblclick = new EventEmitter<ShopRegistration>();
  @Input() moveto?: EventEmitter<ILocation>;
  @Input() select?: EventEmitter<ShopRegistration>;
  @Input() over?: EventEmitter<ShopRegistration>;
  @Input() out?: EventEmitter<ShopRegistration>;
  @Input() shops: ShopRegistration[] = [];
  @Input() devices: MobileDevice[] = [];
  @Input() alarms: MobileEventRecord[] = [];
  @Output() alarmvideo = new EventEmitter<MobileEventRecord>();
  @Output() alarmpicture = new EventEmitter<Paged<MobileEventRecord>>();
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
    this.change.alarms(changes['alarms']);
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
    alarms: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load.alarms(this.alarms);
      }
    },
  };
  ngOnDestroy(): void {
    this.controller.map.destory();
    this.subscription.unsubscribe();
  }

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
    alarms: (datas: MobileEventRecord[]) => {
      this.controller.alarm.clear().then((x) => {
        this.controller.alarm.load(datas);
      });
    },
  };
  private regist = {
    all: () => {
      this.regist.shop();
      this.regist.map();
      this.regist.alarm();
    },
    alarm: () => {
      this.controller.alarm.event.video.subscribe((data) => {
        this.alarmvideo.emit(data);
      });
      this.controller.alarm.event.picture.subscribe((data) => {
        let paged = Paged.create(data, 1, 1, data.Resources?.length ?? 1);
        this.alarmpicture.emit(paged);
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
    },
    shop: () => {
      if (this.select) {
        let sub = this.select.subscribe((x) => {
          this.controller.shop.focus(x);
        });
        this.subscription.add(sub);
      }
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
        this.itemclick.emit(x);
      });
      this.controller.shop.event.dblclick.subscribe((x) => {
        this.itemdblclick.emit(x);
      });
    },
  };
}
