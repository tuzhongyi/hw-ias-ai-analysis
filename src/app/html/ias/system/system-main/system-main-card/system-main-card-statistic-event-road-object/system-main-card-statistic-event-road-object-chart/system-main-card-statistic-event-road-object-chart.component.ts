import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { SystemMainCardStatisticEventChartComponent } from '../../system-main-card-statistic-event/system-main-card-statistic-event-chart/system-main-card-statistic-event-chart.component';

@Component({
  selector: 'ias-system-main-card-statistic-event-road-object-chart',
  imports: [],
  templateUrl:
    './system-main-card-statistic-event-road-object-chart.component.html',
  styleUrl:
    './system-main-card-statistic-event-road-object-chart.component.less',
})
export class SystemMainCardStatisticEventRoadObjectChartComponent extends SystemMainCardStatisticEventChartComponent {
  @ViewChild('system_main_card_statistic_event_road_object_chart')
  declare element?: ElementRef;

  override set(datas: ChartItem[]) {
    this.option.color = [ColorTool.blue, ColorTool.orange, ColorTool.red];
    this.option.series[0].data = [...datas];
    this.option.series[1].data = [...datas];
  }
}
