import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../common/components/hw-select/select-control.component';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { MobileDevice } from '../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { EnumNameValue } from '../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { ILocation } from '../../../../../common/data-core/models/model.interface';
import { Paged } from '../../../../../common/data-core/models/page-list.model';
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
import { SystemMainCardDeviceStateComponent } from '../system-main-card/system-main-card-device-state/system-main-card-device-state.component';
import { SystemMainCardEventRealtimeStatisticComponent } from '../system-main-card/system-main-card-event-realtime-statistic/system-main-card-event-realtime-statistic/system-main-card-event-realtime-statistic.component';
import { SystemMainCardEventRealtimeTableManagerComponent } from '../system-main-card/system-main-card-event-realtime-table/system-main-card-event-realtime-table-manager/system-main-card-event-realtime-table-manager.component';
import { SystemMainCardEventStatisticComponent } from '../system-main-card/system-main-card-event-statistic/system-main-card-event-statistic/system-main-card-event-statistic.component';
import { SystemMainCardShopStatisticComponent } from '../system-main-card/system-main-card-shop-statistic/system-main-card-shop-statistic.component';
import { SystemMainCardTaskStatisticComponent } from '../system-main-card/system-main-card-task-statistic/system-main-card-task-statistic/system-main-card-task-statistic.component';
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
    SystemMainCardEventStatisticComponent,
    SystemMainCardDeviceStateComponent,
    SystemMainCardShopStatisticComponent,
    SystemMainCardEventRealtimeStatisticComponent,
    SystemMainCardTaskStatisticComponent,
    SystemMainCardEventRealtimeTableManagerComponent,
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
  ],
  templateUrl: './system-main-manager.component.html',
  styleUrl: './system-main-manager.component.less',
  providers: [SystemMainManagerBusiness, SystemMainManagerSource],
})
export class SystemMainManagerComponent implements OnInit {
  constructor(
    private business: SystemMainManagerBusiness,
    public source: SystemMainManagerSource,
    private toastr: ToastrService
  ) {}

  window = new SystemMainManagerWindow();
  load = new EventEmitter<void>();
  card = new SystemMainManagerCard(this.window);

  panel = new SystemMainManagerPanel(this.window);

  ngOnInit(): void {
    this.init.shop();
    this.init.device();
  }

  private init = {
    shop: () => {
      this.shop.load();
    },
    device: () => {
      this.device.load();
    },
  };

  realtime = {
    datas: [] as MobileEventRecord[],
    on: {
      loaded: (datas: MobileEventRecord[]) => {
        this.realtime.datas = datas.filter((x) => !x.Assignment?.Handled);
      },
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
    datas: [] as MobileDevice[],
    load: () => {
      this.business.device.load().then((x) => {
        this.device.datas = x;
      });
    },
  };

  shop = {
    datas: [] as ShopRegistration[],
    selected: undefined as ShopRegistration | undefined,
    args: new SystemMainManagerShopArgs(),

    load: () => {
      this.business.shop.load(this.shop.args).then((x) => {
        this.shop.datas = x;
      });
    },
    search: (args: SystemMainManagerShopArgs) => {
      this.shop.args = args;
      this.shop.load();
    },
  };

  map = {
    over: new EventEmitter<ShopRegistration>(),
    out: new EventEmitter<ShopRegistration>(),
    select: new EventEmitter<ShopRegistration>(),
    moveto: new EventEmitter<ILocation>(),
    on: {
      select: (data: ShopRegistration) => {
        this.shop.selected = data;
      },
      details: (data: ShopRegistration) => {
        this.shop.selected = data;
        this.panel.details.show = true;
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
