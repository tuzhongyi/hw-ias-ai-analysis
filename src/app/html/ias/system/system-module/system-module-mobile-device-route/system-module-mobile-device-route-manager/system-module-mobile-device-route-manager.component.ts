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
import { TimeControlComponent } from '../../../../../../common/components/time-control/time-control.component';
import { TimeModel } from '../../../../../../common/components/time-control/time-control.model';
import { TimelineComponent } from '../../../../../../common/components/timeline/timeline.component';
import { VideoPlayerContainerComponent } from '../../../../../../common/components/video-player-container/video-player-container.component';
import { PlaybackArgs } from '../../../../../../common/components/video-player-container/video-player-container.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { InputProxyChannel } from '../../../../../../common/data-core/models/arm/input-proxy-channel.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { ArmSystemRequestService } from '../../../../../../common/data-core/requests/services/system/system.service';
import { DateTimePickerView } from '../../../../../../common/directives/date-time-picker/date-time-picker.directive';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { DurationUnit } from '../../../../../../common/tools/date-time-tool/duration.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { wait } from '../../../../../../common/tools/wait';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleMobileDeviceRouteChartContainerComponent } from '../system-module-mobile-device-route-chart-container/system-module-mobile-device-route-chart-container.component';
import { SystemModuleMobileDeviceRouteInfoComponent } from '../system-module-mobile-device-route-info/system-module-mobile-device-route-info.component';
import { SystemModuleMobileDeviceRouteMapPathStateComponent } from '../system-module-mobile-device-route-map-path-state/system-module-mobile-device-route-map-path-state.component';
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
    TimeControlComponent,
    TimelineComponent,
    HowellSelectComponent,
    SystemModuleMobileDeviceRouteMapComponent,
    SystemModuleMobileDeviceRouteMapSettingsComponent,
    SystemModuleMobileDeviceRouteInfoComponent,
    SystemModuleMobileDeviceRouteChartContainerComponent,
    SystemModuleMobileDeviceRouteMapPathStateComponent,
    WindowComponent,
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
    public language: LanguageTool,
  ) {}

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
        this.map.load.emit(this.map.args);
        this.chart.load.emit(this.map.args);
      }, 100);
    }
  }
  map = {
    args: new SystemModuleMobileDeviceRouteArgs(),
    load: new EventEmitter<SystemModuleMobileDeviceRouteArgs>(),
    init: new EventEmitter<string>(),
    rectified: false,
    datas: [] as FileGpsItem[],
    current: undefined as FileGpsItem | undefined,
    loaded: false,
    on: {
      loaded: (datas: FileGpsItem[]) => {
        this.map.loaded = true;

        this.map.datas = [...datas];
        this.timeline.datas = datas.map((x) => x.OSDTime!);
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

    date: {
      value: new Date(),
      format: Language.YearMonthDay,
      week: false,
      view: {
        min: DateTimePickerView.month,
      },
      change: () => {
        this.map.args.duration.begin.setFullYear(
          this.manager.date.value.getFullYear(),
          this.manager.date.value.getMonth(),
          this.manager.date.value.getDate(),
        );
        this.map.args.duration.end.setFullYear(
          this.manager.date.value.getFullYear(),
          this.manager.date.value.getMonth(),
          this.manager.date.value.getDate(),
        );
      },
    },
    time: {
      begin: new TimeModel(0, 0, 0),
      end: new TimeModel(23, 59, 59),
      change: () => {
        this.map.args.duration.begin.setHours(
          this.manager.time.begin.hour.value,
          this.manager.time.begin.minute.value,
          this.manager.time.begin.second.value,
        );
        this.map.args.duration.end.setHours(
          this.manager.time.end.hour.value,
          this.manager.time.end.minute.value,
          this.manager.time.end.second.value,
        );
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
      },

      unit: () => {
        this.manager.date.week = this.map.args.unit == DurationUnit.week;
        switch (this.map.args.unit) {
          case DurationUnit.month:
            this.manager.date.view.min = DateTimePickerView.year;
            this.manager.date.format = Language.YearMonth;
            break;
          case DurationUnit.year:
            this.manager.date.view.min = DateTimePickerView.decade;
            this.manager.date.format = Language.Year;
            break;

          default:
            this.manager.date.view.min = DateTimePickerView.month;
            this.manager.date.format = Language.YearMonthDay;
            break;
        }
        this.manager.on.search();
      },
      search: () => {
        this.manager.been = true;
        if (!this.map.args.deviceId) {
          this.toastr.warning(`请选择${this.language.device.Name}`);
          return;
        }
        this.window.video.show = false;
        this.chart.show = true;
        setTimeout(() => {
          this.info.load.emit(this.map.args);
          this.map.load.emit(this.map.args);
          this.chart.load.emit(this.map.args);
        }, 0);
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
          this.toastr.warning(`${this.language.device.Name}不在线`);
          return;
        }
        if (!this.video.channel.id) {
          this.toastr.warning('请选择视频通道');
          return;
        }

        this.window.video.preview(this.device, this.video.channel.id);
        this.info.load.emit(this.map.args);
        if (!this.map.loaded) {
          setTimeout(() => {
            this.map.init.emit(this.device?.Id);
          }, 0);
        }
      }
    },
    playback: async () => {
      this.manager.been = true;
      this.chart.show = false;
      this.map.loaded = false;
      setTimeout(() => {
        this.info.load.emit(this.map.args);
        this.map.load.emit(this.map.args);
      }, 0);

      wait(() => {
        return this.map.loaded;
      }).then(() => {
        let duration = this.map.args.duration;
        if (this.timeline.datas.length >= 2) {
          duration.begin = new Date(this.timeline.datas[0].getTime());
          duration.end = new Date(
            this.timeline.datas[this.timeline.datas.length - 1].getTime(),
          );
        }
        if (!DateTimeTool.is.less(duration, 5 * 60)) {
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
    change: (data: Date) => {
      this.map.current = this.map.datas.find(
        (x) => x.OSDTime?.getTime() == data.getTime(),
      );
      if (this.window.video.show) {
        if (this.window.video.args instanceof PlaybackArgs) {
          let duration = DateTimeTool.after(data, 5 * 60);
          this.window.video.change.duration(duration);
        }
      }
    },
  };
}
