import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { ShopRegistration } from '../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemMainCardDeviceStateComponent } from '../system-main-card/system-main-card-device-state/system-main-card-device-state.component';
import { SystemMainCardEventRealtimeStatisticComponent } from '../system-main-card/system-main-card-event-realtime-statistic/system-main-card-event-realtime-statistic/system-main-card-event-realtime-statistic.component';
import { SystemMainCardEventRealtimeTableManagerComponent } from '../system-main-card/system-main-card-event-realtime-table/system-main-card-event-realtime-table-manager/system-main-card-event-realtime-table-manager.component';
import { SystemMainCardEventStatisticComponent } from '../system-main-card/system-main-card-event-statistic/system-main-card-event-statistic/system-main-card-event-statistic.component';
import { SystemMainCardShopStatisticComponent } from '../system-main-card/system-main-card-shop-statistic/system-main-card-shop-statistic.component';
import { SystemMainCardTaskStatisticComponent } from '../system-main-card/system-main-card-task-statistic/system-main-card-task-statistic/system-main-card-task-statistic.component';
import { SystemMainMapComponent } from '../system-main-map/system-main-map.component';
import { SystemMainPanelControlsComponent } from '../system-main-panel/system-main-panel-controls/system-main-panel-controls.component';
import { SystemMainPanelShopRegistrationTableManagerComponent } from '../system-main-panel/system-main-panel-shop-registration/system-main-panel-shop-registration-table-manager/system-main-panel-shop-registration-table-manager.component';
import { SystemMainManagerCard } from './card/system-main-manager.card';

@Component({
  selector: 'ias-system-main-manager',
  imports: [
    CommonModule,
    SystemMainCardEventStatisticComponent,
    SystemMainCardDeviceStateComponent,
    SystemMainCardShopStatisticComponent,
    SystemMainCardEventRealtimeStatisticComponent,
    SystemMainCardTaskStatisticComponent,
    SystemMainCardEventRealtimeTableManagerComponent,
    SystemMainPanelControlsComponent,
    SystemMainPanelShopRegistrationTableManagerComponent,
    SystemMainMapComponent,
  ],
  templateUrl: './system-main-manager.component.html',
  styleUrl: './system-main-manager.component.less',
  providers: [],
})
export class SystemMainManagerComponent implements OnInit {
  constructor() {}

  load = new EventEmitter<void>();
  card = new SystemMainManagerCard();

  data = {
    shops: [] as ShopRegistration[],
  };

  ngOnInit(): void {}
}
