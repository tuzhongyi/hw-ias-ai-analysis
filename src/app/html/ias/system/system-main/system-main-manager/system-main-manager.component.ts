import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../common/components/hw-select/select-control.component';
import { GpsTaskSampleRecord } from '../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { ILocation } from '../../../../../common/data-core/models/model.interface';
import { Paged } from '../../../../../common/data-core/models/page-list.model';
import { DateTimeTool } from '../../../../../common/tools/date-time-tool/datetime.tool';
import { ObjectTool } from '../../../../../common/tools/object-tool/object.tool';
import { PictureListComponent } from '../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../share/window/window.component';
import { SystemEventManagerAnalysisComponent } from '../../system-event/system-event-manager/system-event-manager-analysis/system-event-manager-analysis.component';
import { SystemEventManagerRealtimeComponent } from '../../system-event/system-event-manager/system-event-manager-realtime/system-event-manager-realtime.component';
import { SystemEventManagerShopComponent } from '../../system-event/system-event-manager/system-event-manager-shop/system-event-manager-shop.component';
import { SystemEventProcessRealtimeComponent } from '../../system-event/system-event-process/system-event-process-realtime/system-event-process-realtime.component';
import { SystemEventVideoComponent } from '../../system-event/system-event-video/system-event-video.component';
import { SystemMapPanelDetailsShopRegistrationComponent } from '../../system-map/system-map-panel-details-shop-registration/system-map-panel-details-shop-registration.component';
import { SystemTaskManagerComponent } from '../../system-task/system-task-shop/system-task-manager/system-task-manager.component';
import { SystemTaskVideoComponent } from '../../system-task/system-task-shop/system-task-video/system-task-video.component';
import { SystemMainCardDeviceRouteStatisticComponent } from '../system-main-card/system-main-card-device-route-statistic/system-main-card-device-route-statistic/system-main-card-device-route-statistic.component';
import { SystemMainCardDeviceStateComponent } from '../system-main-card/system-main-card-device-state/system-main-card-device-state.component';
import { SystemMainCardEventChartLineRealtimeComponent } from '../system-main-card/system-main-card-event-chart/system-main-card-event-chart-line-realtime/system-main-card-event-chart-line-realtime.component';
import { SystemMainCardEventChartLineSampleComponent } from '../system-main-card/system-main-card-event-chart/system-main-card-event-chart-line-sample/system-main-card-event-chart-line-sample.component';
import { SystemMainCardEventChartLineShopComponent } from '../system-main-card/system-main-card-event-chart/system-main-card-event-chart-line-shop/system-main-card-event-chart-line-shop.component';
import { SystemMainCardEventRealtimeStatisticComponent } from '../system-main-card/system-main-card-event-realtime-statistic/system-main-card-event-realtime-statistic/system-main-card-event-realtime-statistic.component';
import { SystemMainCardEventTableComponent } from '../system-main-card/system-main-card-event-table/system-main-card-event-table.component';
import { SystemMainCardShopStatisticComponent } from '../system-main-card/system-main-card-shop-statistic/system-main-card-shop-statistic.component';
import { SystemMainCardStatisticEventShopComponent } from '../system-main-card/system-main-card-statistic-event-shop/system-main-card-statistic-event-shop/system-main-card-statistic-event-shop.component';
import { SystemMainCardStatisticEventComponent } from '../system-main-card/system-main-card-statistic-event/system-main-card-statistic-event/system-main-card-statistic-event.component';
import { SystemMainCardStatisticNumberDivisionListComponent } from '../system-main-card/system-main-card-statistic-number-division/system-main-card-statistic-number-division-list/system-main-card-statistic-number-division-list.component';
import { SystemMainCardStatisticNumberDeviceComponent } from '../system-main-card/system-main-card-statistic-number/system-main-card-statistic-number-device/system-main-card-statistic-number-device.component';
import { SystemMainCardStatisticNumberComponent } from '../system-main-card/system-main-card-statistic-number/system-main-card-statistic-number/system-main-card-statistic-number.component';
import { SystemMainCardTaskStatisticComponent } from '../system-main-card/system-main-card-task-statistic/system-main-card-task-statistic/system-main-card-task-statistic.component';
import { SystemMainMapHeatmapFilterComponent } from '../system-main-map-heatmap/system-main-map-heatmap-filter/system-main-map-heatmap-filter.component';
import { SystemMainMapNavigationComponent } from '../system-main-map-navigation/system-main-map-navigation.component';
import {
  EventMode,
  SyatemMainMapNavigation,
} from '../system-main-map-navigation/system-main-map-navigation.model';
import { SystemMainMapComponent } from '../system-main-map/system-main-map.component';
import { SystemMainPanelControlsComponent } from '../system-main-panel/system-main-panel-controls/system-main-panel-controls.component';
import { SystemMainPanelShopRegistrationTableManagerComponent } from '../system-main-panel/system-main-panel-shop-registration/system-main-panel-shop-registration-table-manager/system-main-panel-shop-registration-table-manager.component';
import { SystemMainManagerBusiness } from './business/system-main-manager.business';
import { SystemMainManagerShopArgs } from './business/system-main-manager.model';
import { SystemMainManagerCard } from './card/system-main-manager.card';
import { SystemMainManagerPanel } from './panel/system-main-manager.panel';
import { SystemMainManagerSource } from './source/system-main-manager.source';
import { SystemMainManagerWindow } from './window/system-main-manager.window';

@Component({
  selector: 'ias-system-main-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    SystemMainCardStatisticNumberComponent,
    SystemMainCardStatisticNumberDeviceComponent,
    SystemMainCardStatisticNumberDivisionListComponent,
    SystemMainCardDeviceStateComponent,
    SystemMainCardShopStatisticComponent,
    SystemMainCardEventRealtimeStatisticComponent,
    SystemMainCardTaskStatisticComponent,
    SystemMainCardDeviceRouteStatisticComponent,
    SystemMainCardEventTableComponent,
    SystemMainCardStatisticEventComponent,
    SystemMainCardStatisticEventShopComponent,
    SystemMainCardEventChartLineRealtimeComponent,
    SystemMainCardEventChartLineShopComponent,
    SystemMainCardEventChartLineSampleComponent,
    SystemMainPanelControlsComponent,
    SystemMainPanelShopRegistrationTableManagerComponent,
    SystemMainMapComponent,
    SystemMapPanelDetailsShopRegistrationComponent,
    WindowComponent,
    PictureListComponent,
    SystemEventVideoComponent,
    SystemTaskVideoComponent,
    SystemEventProcessRealtimeComponent,
    SystemEventManagerRealtimeComponent,
    SystemEventManagerShopComponent,
    SystemEventManagerAnalysisComponent,
    SystemTaskManagerComponent,
    SystemMainMapNavigationComponent,
    SystemMainMapHeatmapFilterComponent,
  ],
  templateUrl: './system-main-manager.component.html',
  styleUrl: './system-main-manager.component.less',
  providers: [SystemMainManagerBusiness, SystemMainManagerSource],
})
export class SystemMainManagerComponent implements OnInit {
  constructor(
    private business: SystemMainManagerBusiness,
    public source: SystemMainManagerSource,
    public toastr: ToastrService
  ) {}

  Navigation = SyatemMainMapNavigation;
  window = new SystemMainManagerWindow();
  load = new EventEmitter<void>();
  card = new SystemMainManagerCard(this);
  panel = new SystemMainManagerPanel(this);
  duration = DateTimeTool.all.day(new Date());

  ngOnInit(): void {
    this.init.shop();
    this.init.device();
    this.init.realtime();
    this.init.sample();
    this.panel.navigation.change(SyatemMainMapNavigation.main, true);
  }

  private init = {
    shop: () => {
      this.shop.load();
    },
    device: () => {
      this.device.load();
    },
    realtime: () => {
      this.realtime.load();
    },
    sample: () => {
      this.gps.task.load();
    },
  };

  gps = {
    task: {
      datas: [] as GpsTaskSampleRecord[],
      load: () => {
        this.business.sample.load(this.duration).then((x) => {
          this.gps.task.datas = x;
          this.map.data.sample = x;
        });
      },
      on: {
        // loaded: (datas: MobileEventRecord[]) => {
        //   this.realtime.datas = datas.filter((x) => !x.Assignment?.Assigned);
        // },
        position: (data: GpsTaskSampleRecord) => {
          if (!data.Location) {
            this.toastr.warning('位置为空，无法定位');
            return;
          }
          this.map.moveto.emit(data);
        },
        details: (data: GpsTaskSampleRecord) => {
          // this.window.details.data = data;
          // this.window.details.show = true;
        },
      },
    },
  };

  realtime = {
    datas: [] as MobileEventRecord[],
    load: () => {
      this.business.mobile.load(this.duration, EventMode.gpstask).then((x) => {
        this.realtime.datas = x;
        this.map.data.realtime = x.filter((y) => !y.Assignment?.Assigned);
      });
    },
    on: {
      // loaded: (datas: MobileEventRecord[]) => {
      //   this.realtime.datas = datas.filter((x) => !x.Assignment?.Assigned);
      // },
      position: (data: MobileEventRecord) => {
        if (!data.Location) {
          this.toastr.warning('位置为空，无法定位');
          return;
        }
        this.map.moveto.emit(data);
      },
      details: (data: MobileEventRecord) => {
        this.window.details.data = data;
        this.window.details.show = true;
      },
    },
  };

  device = {
    load: () => {
      this.business.device.load().then((x) => {
        this.map.data.device = x;
      });
    },
  };

  shop = {
    data: {
      registration: [] as ShopRegistration[],
      record: [] as MobileEventRecord[],
    },
    selected: undefined as ShopRegistration | undefined,
    args: new SystemMainManagerShopArgs(),

    load: () => {
      this.business.shop.load(this.shop.args).then((x) => {
        this.shop.data.registration = x;
        this.map.data.shop = x;
      });
      this.business.mobile.load(this.duration, EventMode.shop).then((x) => {
        this.shop.data.record = x;
      });
    },
    search: (args: SystemMainManagerShopArgs) => {
      this.shop.args = args;
      this.shop.load();
    },
  };

  map = {
    data: {
      shop: [] as ShopRegistration[],
      device: [] as MobileDevice[],
      realtime: [] as MobileEventRecord[],
      sample: [] as GpsTaskSampleRecord[],
    },
    over: new EventEmitter<ShopRegistration>(),
    out: new EventEmitter<ShopRegistration>(),
    select: new EventEmitter<ShopRegistration>(),
    moveto: new EventEmitter<ILocation>(),
    heatmap: {
      load: new EventEmitter<ILocation[]>(),
    },
    display: {
      shop: true,
      device: true,
      alarm: true,
      sample: true,
      heatmap: false,
    },
    on: {
      select: (data: ShopRegistration) => {
        this.shop.selected = data;
      },
      details: (data: ShopRegistration) => {
        this.shop.selected = data;
        this.panel.details.show = true;
      },
      heatmap: (datas: ILocation[]) => {
        this.map.heatmap.load.emit(datas);
      },
    },
  };

  table = {
    on: {
      details: (item: ShopRegistration) => {
        this.map.on.details(item);
      },
      position: (item: ShopRegistration) => {
        if (!item.Location) {
          this.toastr.warning('位置为空，无法定位');
          return;
        }
        this.map.select.emit(item);
      },
      item: {
        over: (item: ShopRegistration) => {
          this.map.over.emit(item);
        },
        out: (item: ShopRegistration) => {
          this.map.out.emit(item);
        },
      },
    },
  };

  picture = {
    open: <T>(paged: Paged<T>) => {
      this.window.picture.open(paged);
    },
  };

  alarm = {
    on: {
      video: async (data: MobileEventRecord) => {
        this.window.video.record.title =
          ObjectTool.model.MobileEventRecord.get.name(data);
        this.window.video.record.channels =
          data.Resources?.map((x) => {
            let channel = new EnumNameValue<number>();
            channel.Name = x.ResourceName;
            channel.Value = x.PositionNo ?? 0;
            return channel;
          }) ?? [];

        this.window.video.record.data = data;
        this.window.video.record.show = true;
      },
    },
  };
}
