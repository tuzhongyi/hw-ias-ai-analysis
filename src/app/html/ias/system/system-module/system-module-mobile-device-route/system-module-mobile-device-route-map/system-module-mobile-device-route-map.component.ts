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
import { GisPointMatchResult } from '../../../../../../common/data-core/models/arm/geographic/patrol/gis-point-match-result.model';
import { GeoTool } from '../../../../../../common/tools/geo-tool/geo.tool';
import { PathTool } from '../../../../../../common/tools/path-tool/path.tool';
import { IVideoPathMapTriggerArgs } from '../../../../share/video-path/video-path-map/video-path-map.model';
import { SystemModuleMobileDeviceRouteArgs } from '../system-module-mobile-device-route.model';
import { SystemModuleMobileDeviceRouteMapBusiness } from './business/system-module-mobile-device-route-map.business';
import { SystemModuleMobileDeviceRouteMapController } from './controller/system-module-mobile-device-route-map.controller';

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
  @Input() routeload?: EventEmitter<SystemModuleMobileDeviceRouteArgs>;
  @Input() routeclear?: EventEmitter<void>;
  @Output() routeloaded = new EventEmitter<FileGpsItem[]>();

  @Input() patrolload?: EventEmitter<SystemModuleMobileDeviceRouteArgs>;
  @Input() patrolclear?: EventEmitter<void>;
  @Output() patrolloaded = new EventEmitter<GisPointMatchResult[][][]>();

  @Input() init?: EventEmitter<string>;
  @Input() rectified = false;

  @Input() gps?: FileGpsItem;
  @Output() devicedblclick = new EventEmitter<void>();
  @Output() pathclick = new EventEmitter<IVideoPathMapTriggerArgs>();

  constructor(
    private business: SystemModuleMobileDeviceRouteMapBusiness,
    path: PathTool,
  ) {
    this.controller = new SystemModuleMobileDeviceRouteMapController(
      this.subscription,
      path,
    );
  }

  private args?: SystemModuleMobileDeviceRouteArgs;
  private subscription = new Subscription();
  private controller: SystemModuleMobileDeviceRouteMapController;
  private loaded = {
    route: false,
    patrol: false,
  };

  private regist = {
    all: () => {
      this.regist.input();
      this.regist.output();
    },
    input: () => {
      if (this.routeclear) {
        let sub = this.routeclear.subscribe((x) => {
          this.controller.path.clear();
          this.loaded.route = false;
        });
        this.subscription.add(sub);
      }
      if (this.patrolclear) {
        let sub = this.patrolclear.subscribe((x) => {
          this.controller.section.clear();
          this.controller.match.clear();
          this.loaded.patrol = false;
        });
        this.subscription.add(sub);
      }
      if (this.patrolload) {
        let sub = this.patrolload.subscribe((datas) => {
          this.load.patrol
            .match(datas)
            .then((x) => {
              if (x.length == 0) {
                this.load.patrol.section(datas);
              }
            })
            .catch((x) => {
              this.load.patrol.section(datas);
            })
            .finally(() => {
              this.loaded.patrol = true;
            });
        });
        this.subscription.add(sub);
      }
      if (this.routeload) {
        let sub = this.routeload.subscribe((x) => {
          this.load.device(x);
          this.load.route(x, this.rectified);
        });
        this.subscription.add(sub);
      }
      // init: 接收 deviceId，获取设备信息并在高德地图上显示设备位置
      if (this.init) {
        let sub = this.init.subscribe((deviceId) => {
          this.business.route
            .device(deviceId)
            .then((device) => {
              this.controller.device.load(device).then((marker) => {
                this.controller.map.focus(marker);
              });
            })
            .finally(() => {
              this.routeloaded.emit([]);
            });
        });
        this.subscription.add(sub);
      }
    },
    output: () => {
      // 订阅 device marker 的 dblclick 事件，通过 Output 对外抛出
      this.subscription.add(
        this.controller.device.event.dblclick.subscribe(() => {
          this.devicedblclick.emit();
        }),
      );
      this.subscription.add(
        this.controller.path.event.click.subscribe((x) => {
          let positions = this.business.route.datas.map<[number, number]>(
            (x) => [x.Longitude, x.Latitude],
          );
          let closest = GeoTool.polyline.closest.get(positions, x);

          if (closest) {
            let args = {
              start: this.business.route.datas[closest.segmentIndex],
              end: this.business.route.datas[closest.segmentIndex + 1],
              percent: closest.percent.segment,
            };
            console.log(args);
            this.pathclick.emit(args);
          }
        }),
      );
    },
  };

  private load = {
    patrol: {
      section: async (args: SystemModuleMobileDeviceRouteArgs) => {
        await this.controller.section.clear();
        let device = await this.business.route.device(args.deviceId);
        let sections = await this.business.patrol.section(device);
        let lines = await this.controller.section.load(sections);
        this.controller.map.focus(lines);
      },
      match: async (args: SystemModuleMobileDeviceRouteArgs) => {
        try {
          await this.controller.match.clear();
          let datas = await this.business.patrol.match(args);
          this.patrolloaded.emit(datas);
          let lines = await this.controller.match.load(datas);
          this.controller.map.focus(lines);
          return datas;
        } catch (error) {
          this.patrolloaded.emit([]);
          return [];
        }
      },
    },
    route: (args: SystemModuleMobileDeviceRouteArgs, rectified: boolean) => {
      this.args = args;
      let datas: FileGpsItem[] = [];
      this.business.route
        .load(args, rectified)
        .then((gps) => {
          this.controller.path.clear();
          this.loaded.route = false;
          this.controller.path.load(gps).then((x) => {
            this.loaded.route = true;
            this.controller.map.focus(x);
          });
          for (let i = 0; i < gps.length; i++) {
            datas = [...datas, ...gps[i]];
          }
        })
        .finally(() => {
          this.routeloaded.emit(datas);
        });
    },
    device: (args: SystemModuleMobileDeviceRouteArgs) => {
      this.business.route.device(args.deviceId).then((x) => {
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
          this.load.route(this.args, this.rectified);
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
    this.regist.all();
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
