import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShopObjectState } from '../../../../../../../common/data-core/enums/analysis/shop-object-state.enum';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { SystemMainCardStatisticEventChartComponent } from '../../system-main-card-statistic-event/system-main-card-statistic-event-chart/system-main-card-statistic-event-chart.component';

@Component({
  selector: 'ias-system-main-card-statistic-event-shop-chart',
  imports: [],
  templateUrl: './system-main-card-statistic-event-shop-chart.component.html',
  styleUrl: './system-main-card-statistic-event-shop-chart.component.less',
})
export class SystemMainCardStatisticEventShopChartComponent extends SystemMainCardStatisticEventChartComponent {
  @ViewChild('system_main_card_statistic_event_shop_chart')
  declare element?: ElementRef;

  override set(datas: ChartItem[]) {
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];
      this.option.color = [
        ColorTool.ShopObjectState(ShopObjectState.Created),
        ColorTool.ShopObjectState(ShopObjectState.Disappeared),
        ColorTool.ShopObjectState(ShopObjectState.Existed),
      ];
      let index = this.option.series[0].data.findIndex(
        (x: ChartItem) => x.id === item.id
      );
      if (index >= 0) {
        this.option.series[0].data[index] = item;
        this.option.series[1].data[index] = item;
      }
    }
  }
}
