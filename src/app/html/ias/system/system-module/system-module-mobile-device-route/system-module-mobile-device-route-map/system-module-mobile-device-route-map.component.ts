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
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { SystemModuleMobileDeviceRouteArgs } from '../system-module-mobile-device-route.model';
import { SystemModuleMobileDeviceRouteMapController } from './controller/system-module-mobile-device-route-map.controller';
import { SystemModuleMobileDeviceRouteMapBusiness } from './system-module-mobile-device-route-map.business';

@Component({
  selector: 'howell-system-module-mobile-device-route-map',
  imports: [CommonModule],
  templateUrl: './system-module-mobile-device-route-map.component.html',
  styleUrl: './system-module-mobile-device-route-map.component.less',
  providers: [SystemModuleMobileDeviceRouteMapBusiness],
})
export class SystemModuleMobileDeviceRouteMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() load?: EventEmitter<SystemModuleMobileDeviceRouteArgs>;
  @Input() init?: EventEmitter<string>;
  @Input() rectified = false;
  @Output('loaded') _loaded = new EventEmitter<FileGpsItem[]>();
  @Input() gps?: FileGpsItem;
  @Output() devicedblclick = new EventEmitter<void>();

  constructor(private business: SystemModuleMobileDeviceRouteMapBusiness) {}

  loaded = false;
  loading = false;
  private args?: SystemModuleMobileDeviceRouteArgs;
  private subscription = new Subscription();
  private controller = new SystemModuleMobileDeviceRouteMapController(
    this.subscription,
  );
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.data.device(x);
        this.data.load(x, this.rectified);
      });
      this.subscription.add(sub);
    }
    // init: 接收 deviceId，获取设备信息并在高德地图上显示设备位置
    if (this.init) {
      let sub = this.init.subscribe((deviceId) => {
        this.loading = true;
        this.business
          .device(deviceId)
          .then((device) => {
            this.controller.device.load(device).then((marker) => {
              this.controller.map.focus(marker);
            });
          })
          .finally(() => {
            this.loading = false;
            this.loaded = true;
            this._loaded.emit([]);
          });
      });
      this.subscription.add(sub);
    }
    // 订阅 device marker 的 dblclick 事件，通过 Output 对外抛出
    let deviceDblclick = this.controller.device.event.dblclick.subscribe(() => {
      this.devicedblclick.emit();
    });
    this.subscription.add(deviceDblclick);
  }

  private data = {
    load: (args: SystemModuleMobileDeviceRouteArgs, rectified: boolean) => {
      this.args = args;
      this.loading = true;
      let datas: FileGpsItem[] = [];
      this.business
        .load(args, rectified)
        .then((x) => {
          this.controller.path.clear();
          this.controller.path.load(x);
          for (let i = 0; i < x.length; i++) {
            datas = [...datas, ...x[i]];
          }
        })
        .finally(() => {
          this.loading = false;
          this.loaded = true;
          this._loaded.emit(datas);
        });
    },
    device: (args: SystemModuleMobileDeviceRouteArgs) => {
      this.business.device(args.deviceId).then((x) => {
        this.controller.device.clear().then(() => {
          this.controller.device.load(x);
        });
      });
    },
  };

  private change = {
    rectified: (simple: SimpleChange) => {
      if (simple) {
        if (this.args) {
          this.data.load(this.args, this.rectified);
        }
      }
    },
    gps: (simple: SimpleChange) => {
      if (simple) {
        if (this.gps) {
          this.controller.device.set.position(this.gps);
        }
      }
    },
  };

  ngOnInit(): void {
    this.regist();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.rectified(changes['rectified']);
    this.change.gps(changes['gps']);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
}
