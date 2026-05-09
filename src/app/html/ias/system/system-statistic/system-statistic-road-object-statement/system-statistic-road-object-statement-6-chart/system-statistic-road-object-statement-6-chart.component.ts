import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartAbstract } from '../../../../../../common/tools/chart-tool/chart.abstract';
import { IChartData } from '../../../../../../common/tools/chart-tool/chart.model';
import { SystemStatisticRoadObjectStatement6ChartOption } from './system-statistic-road-object-statement-6-chart.option';

@Component({
  selector: 'ias-system-statistic-road-object-statement-6-chart',
  imports: [],
  templateUrl:
    './system-statistic-road-object-statement-6-chart.component.html',
  styleUrl: './system-statistic-road-object-statement-6-chart.component.less',
})
export class SystemStatisticRoadObjectStatement6ChartComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() option = Object.assign(
    {},
    SystemStatisticRoadObjectStatement6ChartOption
  );
  @Input() datas: IChartData[] = [];
  @Input() interval = 1;
  @Input() xAxis: string[] = [
    '00:00',
    '04:00',
    '08:00',
    '12:00',
    '16:00',
    '20:00',
    '24:00',
  ];

  constructor() {
    super();
  }
  @ViewChild('system_statistic_road_object_statement_6_chart_container')
  element?: ElementRef;

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.view();
  }
  ngOnDestroy() {
    this.destroy();
  }

  private set = {
    interval: (value: number) => {
      (this.option.xAxis as any).axisLabel.interval = value;
    },
    datas: (datas: IChartData<number, string>[], template: any) => {
      this.option.series = [];
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        let json = JSON.stringify(template);
        let item = JSON.parse(json);
        item.data = [
          ...data.datas.map((x) => {
            return { name: data.Name, value: x.value };
          }),
        ];
        this.option.series.push(item);
      }
    },
  };

  private load() {
    this.chart.get().then((chart) => {
      if (!this.datas || this.datas.length === 0) return;
      (this.option.xAxis as any).data = [...this.xAxis];

      let template = Object.assign({}, (this.option.series as any)[0]);
      this.set.datas(this.datas, template);

      this.set.interval(this.interval);

      chart.setOption(this.option);
    });
  }
}
