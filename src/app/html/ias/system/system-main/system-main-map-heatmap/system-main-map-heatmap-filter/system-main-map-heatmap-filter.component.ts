import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { ILocation } from '../../../../../../common/data-core/models/model.interface';
import { SystemEventManagerRealtimeSource } from '../../../system-event/system-event-manager/system-event-manager-realtime/system-event-manager-realtime.soiurce';
import { SystemEventManagerShopSource } from '../../../system-event/system-event-manager/system-event-manager-shop/system-event-manager-shop.soiurce';
import { EventMode } from '../../system-main-map-navigation/system-main-map-navigation.model';
import { SystemMainMapHeatmapBusiness } from '../system-main-map-heatmap.business';
import { SystemMainMapHeatmapFilterController } from './system-main-map-heatmap-filter.controller';
import { IHeatmapFilter } from './system-main-map-heatmap-filter.model';

@Component({
  selector: 'ias-system-main-map-heatmap-filter',
  imports: [CommonModule, FormsModule, DateTimeControlComponent],
  templateUrl: './system-main-map-heatmap-filter.component.html',
  styleUrl: './system-main-map-heatmap-filter.component.less',
  providers: [
    SystemEventManagerShopSource,
    SystemEventManagerRealtimeSource,
    SystemMainMapHeatmapFilterController,
    SystemMainMapHeatmapBusiness,
  ],
})
export class SystemMainMapHeatmapFilterComponent implements OnInit {
  @Output() loaded = new EventEmitter<ILocation[]>();
  constructor(
    private controller: SystemMainMapHeatmapFilterController,
    private business: SystemMainMapHeatmapBusiness
  ) {
    this.filter = this.controller.get(this.mode);
  }

  filter: IHeatmapFilter;
  mode = EventMode.shop;

  ngOnInit(): void {}

  on = {
    search: async () => {
      let datas = await this.business.load(this.mode, this.filter.args);
      this.loaded.emit(datas);
    },
    change: () => {
      this.filter = this.controller.get(this.mode);
    },
  };
}
