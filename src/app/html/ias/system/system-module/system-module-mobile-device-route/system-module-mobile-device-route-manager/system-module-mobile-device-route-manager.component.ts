import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { TimelineComponent } from '../../../../../../common/components/timeline/timeline.component';
import { VideoPlayerContainerComponent } from '../../../../../../common/components/video-player-container/video-player-container.component';
import { PlaybackArgs } from '../../../../../../common/components/video-player-container/video-player-container.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { GisPointMatchResult } from '../../../../../../common/data-core/models/arm/geographic/patrol/gis-point-match-result.model';
import { InputProxyChannel } from '../../../../../../common/data-core/models/arm/input-proxy-channel.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { DurationUnit } from '../../../../../../common/tools/date-time-tool/duration.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { wait } from '../../../../../../common/tools/wait';
import { ArrayTool } from '../../../../../../common/tools/array-tool/array.tool';
import { IVideoPathMapTriggerArgs } from '../../../../share/video-path/video-path-map/video-path-map.model';
import { SystemModuleMobileDeviceRouteChartContainerComponent } from '../system-module-mobile-device-route-chart-container/system-module-mobile-device-route-chart-container.component';
import { SystemModuleMobileDeviceRouteInfoComponent } from '../system-module-mobile-device-route-info/system-module-mobile-device-route-info.component';
import { SystemModuleMobileDeviceRouteMapPathStateComponent } from '../system-module-mobile-device-route-map-path-state/system-module-mobile-device-route-map-path-state.component';
import { SystemModuleMobileDeviceRouteMapPatrolStateComponent } from '../system-module-mobile-device-route-map-patrol-state/system-module-mobile-device-route-map-patrol-state.component';
import { SystemModuleMobileDeviceRouteMapSettingsComponent } from '../system-module-mobile-device-route-map-settings/system-module-mobile-device-route-map-settings.component';
import { SystemModuleMobileDeviceRouteMapComponent } from '../system-module-mobile-device-route-map/system-module-mobile-device-route-map.component';
import {
  SystemModuleMobileDeviceRouteArgs,
  SystemModuleMobileDeviceRouteType,
} from '../system-module-mobile-device-route.model';
import { SystemModuleMobileDeviceRouteManagerSource } from './system-module-mobile-device-route-manager.source';
import { SystemModuleMobileDeviceRouteWindow } from './system-module-mobile-device-route-manager.window';

@Component({
  selector: 'ias-system-module-mobile-device-route-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    TimelineComponent,
    HowellSelectComponent,
    SystemModuleMobileDeviceRouteMapComponent,
    SystemModuleMobileDeviceRouteMapSettingsComponent,
    SystemModuleMobileDeviceRouteInfoComponent,
    SystemModuleMobileDeviceRouteChartContainerComponent,
    SystemModuleMobileDeviceRouteMapPathStateComponent,
    SystemModuleMobileDeviceRouteMapPatrolStateComponent,
    VideoPlayerContainerComponent,
  ],
  templateUrl: './system-module-mobile-device-route-manager.component.html',
  styleUrl: './system-module-mobile-device-route-manager.component.less',
  providers: [SystemModuleMobileDeviceRouteManagerSource],
})
export class SystemModuleMobileDeviceRouteManagerComponent
  implements OnChanges, OnInit
{
  @Input() deviceId?: string;
  @Input() iswindow = false;
  constructor(
    private toastr: ToastrService,
    public source: SystemModuleMobileDeviceRouteManagerSource,
    private service: ArmSystemRequestService,
  ) {}

  Language = Language;
  window = new SystemModuleMobileDeviceRouteWindow();
  device?: MobileDevice;

  private change = {
    deviceId: (simple: SimpleChange) => {
      if (simple) {
        if (this.deviceId) {
          this.map.args.deviceId = this.deviceId;
          this.manager.on.device();
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.deviceId(changes['deviceId']);
  }

  ngOnInit(): void {
    if (this.map.args.deviceId) {
      this.manager.been = true;
      setTimeout(() => {
        this.info.load.emit(this.map.args);
        this.map.route.load.emit(this.map.args);
        this.chart.load.emit(this.map.args);
      }, 100);
    }
  }
  map = {
    args: new SystemModuleMobileDeviceRouteArgs(),
    clear: () => {
      this.map.route.datas = [];
      this.map.route.clear.emit();
      this.map.patrol.datas = [];
      this.map.patrol.clear.emit();

      this.map.realtime.value = false;
      this.map.realtime.stop();
    },
    route: {
      datas: [] as FileGpsItem[],
      clear: new EventEmitter<void>(),
      load: new EventEmitter<SystemModuleMobileDeviceRouteArgs>(),
    },
    patrol: {
      datas: [] as GisPointMatchResult[][][],
      clear: new EventEmitter<void>(),
      load: new EventEmitter<SystemModuleMobileDeviceRouteArgs>(),
    },
    init: new EventEmitter<string>(),
    rectified: false,
    current: undefined as FileGpsItem | undefined,
    realtime: {
      value: false,
      handle: undefined as any,
      emitter: new EventEmitter<boolean>(),
      start: () => {
        let istoday =
          DateTimeTool.is.today(this.manager.time.data.begin) ||
          DateTimeTool.is.today(this.manager.time.data.end);
        if (!istoday) {
          this.toastr.success('实时路径只能加载当天路径');
        }

        this.manager.time.data = DateTimeTool.all.day(new Date());
        this.map.args.duration = this.manager.time.data;

        this.map.route.datas = [];
        this.map.route.clear.emit();
        this.map.route.load.emit(this.map.args);

        this.map.realtime.handle = setInterval(() => {
          this.map.route.load.emit(this.map.args);
        }, 10 * 1000);
      },
      stop: () => {
        if (this.map.realtime.handle) {
          clearInterval(this.map.realtime.handle);
          this.map.realtime.handle = undefined;
        }
      },
      change: () => {
        if (this.map.realtime.value) {
          this.map.realtime.start();
        } else {
          this.map.realtime.stop();
        }
        this.map.realtime.emitter.emit(this.map.realtime.value);
      },
      onchange: (value: boolean) => {
        this.map.realtime.value = value;
        this.map.realtime.change();
      },
    },
    on: {
      routeloaded: (datas: FileGpsItem[]) => {
        this.map.route.datas = [...datas];
        this.timeline.datas = datas.map((x) => x.OSDTime!);
      },
      patrolloaded: (datas: GisPointMatchResult[][][]) => {
        this.map.patrol.datas = datas;
      },
      pathclick: (args: IVideoPathMapTriggerArgs) => {
        let { start, end, percent } = args;
        if (!start.OSDTime || !end.OSDTime) {
          return;
        }
        let item = new FileGpsItem();
        item.Longitude =
          start.Longitude + (end.Longitude - start.Longitude) * percent;
        item.Latitude =
          start.Latitude + (end.Latitude - start.Latitude) * percent;
        item.OSDTime = new Date(
          start.OSDTime.getTime() +
            (end.OSDTime.getTime() - start.OSDTime.getTime()) * percent,
        );
        this.map.current = item;
        this.timeline.select = item.OSDTime;
        if (
          this.window.video.show &&
          this.window.video.args instanceof PlaybackArgs
        ) {
          this.window.video.change.duration(
            DateTimeTool.after(item.OSDTime, 5 * 60),
          );
        }
      },
    },
  };
  chart = {
    show: false,
    load: new EventEmitter<SystemModuleMobileDeviceRouteArgs>(),
  };
  info = {
    load: new EventEmitter<SystemModuleMobileDeviceRouteArgs>(),
  };
  manager = {
    Unit: DurationUnit,
    RouteStatisticType: SystemModuleMobileDeviceRouteType,
    been: false,
    time: {
      data: DateTimeTool.all.day(new Date()),
      min: DateTimePickerView.hour,
      change: {
        begin: () => {
          let data = this.manager.time.data;
          if (!DateTimeTool.is.less.month(data)) {
            data.end = new Date(data.begin);
            data.end.setMonth(data.end.getMonth() + 1);
            this.toastr.warning('查询期限最多一个月');
          }
          this.map.args.duration = data;
          this.map.clear();
        },
        end: () => {
          let data = this.manager.time.data;
          if (!DateTimeTool.is.less.month(data)) {
            data.begin = new Date(data.end);
            data.begin.setMonth(data.begin.getMonth() - 1);
            this.toastr.warning('查询期限最多一个月');
          }
          this.map.args.duration = data;
          this.map.clear();
        },
      },
    },
    on: {
      device: async () => {
        this.device = (await this.source.devices).find(
          (x) => x.Id == this.map.args.deviceId,
        );
        this.chart.show = !this.window.video.show;

        if (this.device) {
          if (this.window.video.args) {
            this.window.video.args.deviceId = this.device.Id;
          }
          this.source.get.channels(this.device.Id).then((x) => {
            this.video.channel.datas = x;
            this.video.channel.id = undefined;
            if (x.length > 0) {
              this.video.channel.id = x[0].Id;
            }
          });
        }
        this.map.clear();
        if (this.chart.show) {
          this.chart.load.emit(this.map.args);
        }
      },

      search: () => {
        this.manager.been = true;
        this.window.video.show = false;
        this.chart.show = true;
        setTimeout(() => {
          this.info.load.emit(this.map.args);
          this.map.route.load.emit(this.map.args);
          this.chart.load.emit(this.map.args);
        }, 0);
      },
      match: () => {
        this.manager.been = true;
        this.window.video.show = false;
        this.chart.show = true;
        setTimeout(() => {
          this.info.load.emit(this.map.args);
          this.map.patrol.load.emit(this.map.args);
          this.chart.load.emit(this.map.args);
        }, 0);
      },
      clear: {
        route: () => {
          this.map.route.datas = [];
          this.map.route.clear.emit();
          this.map.realtime.value = false;
          this.map.realtime.stop();
        },
        patrol: () => {
          this.map.patrol.datas = [];
          this.map.patrol.clear.emit();
        },
      },
    },
  };

  video = {
    keep: {
      handle: undefined as any,
      interval: 1000 * 10,
      do: () => {
        setTimeout(() => {
          this.service.mobile.device
            .get(this.map.args.deviceId)
            .then((x) => {
              if (x.Location) {
                let gps = new FileGpsItem();
                gps.Longitude = x.Location.GCJ02.Longitude;
                gps.Latitude = x.Location.GCJ02.Latitude;
                this.map.current = gps;
              } else {
                console.warn(`无法获取设备位置:${x.Name}`);
              }
            })
            .finally(() => {
              this.video.keep.do();
            });
        }, this.video.keep.interval);
      },
    },
    channel: {
      datas: [] as InputProxyChannel[],
      id: undefined as number | undefined,
      change: () => {
        if (this.video.channel.id) {
          this.window.video.change.channel(this.video.channel.id);
        }
      },
    },
    preview: async () => {
      this.manager.been = true;
      this.chart.show = false;
      if (this.device) {
        if (this.device.OnlineStatus == 1) {
          this.toastr.warning(`${Language.DeviceName}不在线`);
          return;
        }
        if (!this.video.channel.id) {
          this.toastr.warning('请选择视频通道');
          return;
        }

        this.window.video.preview(this.device, this.video.channel.id);
        this.info.load.emit(this.map.args);
        if (!(this.map.route.datas.length > 0)) {
          setTimeout(() => {
            this.map.init.emit(this.device?.Id);
          }, 0);
        }
      }
    },
    playback: async () => {
      this.manager.been = true;
      this.chart.show = false;

      setTimeout(() => {
        this.info.load.emit(this.map.args);
        this.map.route.load.emit(this.map.args);
      }, 0);

      wait(() => {
        return this.map.route.datas.length > 0;
      }).then(() => {
        let duration = this.map.args.duration;
        if (this.timeline.datas.length >= 2) {
          duration.begin = new Date(this.timeline.datas[0].getTime());
          duration.end = new Date(
            this.timeline.datas[this.timeline.datas.length - 1].getTime(),
          );
        }
        if (!DateTimeTool.is.less.second(duration, 5 * 60)) {
          duration = DateTimeTool.after(duration.begin, 5 * 60);
        }
        this.window.video.show = true;
        if (this.device) {
          if (!this.video.channel.id) {
            this.toastr.warning('请选择视频通道');
            return;
          }

          this.window.video.playback(
            this.device,
            this.video.channel.id,
            duration,
          );
        }
      });
    },
    on: {
      playing: () => {
        if (!this.video.keep.handle) {
          this.video.keep.do();
        }
      },
      stoping: () => {
        if (this.video.keep.handle) {
          clearTimeout(this.video.keep.handle);
          this.video.keep.handle = undefined;
        }
      },
      close: () => {
        this.window.video.show = false;
        this.chart.show = true;
        setTimeout(() => {
          this.chart.load.emit(this.map.args);
        }, 0);
      },
    },
  };

  timeline = {
    datas: [] as Date[],
    select: undefined as Date | undefined,
    change: (data: Date) => {
      let times = this.map.route.datas.map((x) => x.OSDTime!.getTime());
      let closest = ArrayTool.closest.between(times, data.getTime());
      if (closest) {
        let start = this.map.route.datas[closest.left.index];
        let end = this.map.route.datas[closest.right.index];
        let item = new FileGpsItem();
        item.Longitude =
          start.Longitude + (end.Longitude - start.Longitude) * closest.percent;
        item.Latitude =
          start.Latitude + (end.Latitude - start.Latitude) * closest.percent;
        item.OSDTime = data;
        this.map.current = item;
      }
      if (this.window.video.show) {
        if (this.window.video.args instanceof PlaybackArgs) {
          let duration = DateTimeTool.after(data, 5 * 60);
          this.window.video.change.duration(duration);
        }
      }
    },
  };
}
