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
  providers: [
    SystemModuleMobileDeviceRouteMapBusiness,
    SystemModuleMobileDeviceRouteMapController,
  ],
})
export class SystemModuleMobileDeviceRouteMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input()
  load?: EventEmitter<SystemModuleMobileDeviceRouteArgs>;
  @Input() rectified = false;
  @Output('loaded') _loaded = new EventEmitter<FileGpsItem[]>();
  @Input() gps?: FileGpsItem;

  constructor(
    private business: SystemModuleMobileDeviceRouteMapBusiness,
    private controller: SystemModuleMobileDeviceRouteMapController
  ) {}

  loaded = false;
  loading = false;
  private args?: SystemModuleMobileDeviceRouteArgs;
  private subscription = new Subscription();
  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((x) => {
        this.data.device(x);
        this.data.load(x, this.rectified);
      });
      this.subscription.add(sub);
    }
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
        this.controller.device.load(x);
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
