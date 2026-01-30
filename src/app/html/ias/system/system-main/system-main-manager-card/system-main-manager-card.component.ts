import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { GpsTaskSampleRecord } from '../../../../../common/data-core/models/arm/analysis/llm/gps-task-sample-record.model';
import { MobileEventRecord } from '../../../../../common/data-core/models/arm/event/mobile-event-record.model';
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
import { SystemMainCardStatisticNumberComponent } from '../system-main-card/system-main-card-statistic-number/system-main-card-statistic-number/system-main-card-statistic-number.component';
import { SystemMainManagerCard } from '../system-main-manager/card/system-main-manager.card';
import { SystemMainManagerPanel } from '../system-main-manager/panel/system-main-manager.panel';
import { SyatemMainMapNavigation } from '../system-main-map-navigation/system-main-map-navigation.model';

@Component({
  selector: 'ias-system-main-manager-card',
  imports: [
    CommonModule,

    SystemMainCardStatisticNumberComponent,
    SystemMainCardStatisticNumberDivisionListComponent,
    SystemMainCardDeviceStateComponent,
    SystemMainCardShopStatisticComponent,
    SystemMainCardEventRealtimeStatisticComponent,
    SystemMainCardDeviceRouteStatisticComponent,
    SystemMainCardEventTableComponent,
    SystemMainCardStatisticEventComponent,
    SystemMainCardStatisticEventShopComponent,
    SystemMainCardEventChartLineRealtimeComponent,
    SystemMainCardEventChartLineShopComponent,
    SystemMainCardEventChartLineSampleComponent,
  ],
  templateUrl: './system-main-manager-card.component.html',
  styleUrl: './system-main-manager-card.component.less',
})
export class SystemMainManagerCardComponent {
  @Input() panel!: SystemMainManagerPanel;
  @Input() card!: SystemMainManagerCard;
  @Input() load!: EventEmitter<void>;
  @Input() shops: MobileEventRecord[] = [];
  @Input() realtimes: MobileEventRecord[] = [];
  @Input() samples: GpsTaskSampleRecord[] = [];
  Navigation = SyatemMainMapNavigation;
}
