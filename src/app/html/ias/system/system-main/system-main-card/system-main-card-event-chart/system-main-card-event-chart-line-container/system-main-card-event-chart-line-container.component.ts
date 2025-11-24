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
import { ChartAbstract } from '../../../../../../../common/tools/chart-tool/chart.abstract';
import {
  IChartColor,
  IChartData,
} from '../../../../../../../common/tools/chart-tool/chart.model';
import { SystemMainCardEventChartLineEChartOption } from './system-main-card-event-chart-line-container-echart.option';

@Component({
  selector: 'ias-system-main-card-event-chart-line-container',
  imports: [],
  templateUrl: './system-main-card-event-chart-line-container.component.html',
  styleUrl: './system-main-card-event-chart-line-container.component.less',
})
export class SystemMainCardEventChartLineContainerComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() option = Object.assign({}, SystemMainCardEventChartLineEChartOption);
  @Input() datas: IChartData[] = [];
  @Input() interval = 0;
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
  @ViewChild('system_main_card_event_chart_line_container_chart')
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
    color: (colors: (IChartColor | undefined)[]) => {
      this.option.color = [];
      for (let i = 0; i < colors.length; i++) {
        const color = colors[i];
        (this.option.color as any[]).push(color?.line ?? '#00ffff');
        if (!color) continue;

        if (color.area) {
          this.option.series[i].areaStyle.color = color.area;
        }
        if (color.line) {
          this.option.series[i].lineStyle.color = color.line;
        }
        if (color.point) {
          if (color.point.background) {
            this.option.series[i].markPoint.itemStyle.color =
              color.point.background;
          }
          if (color.point.border) {
            this.option.series[i].markPoint.itemStyle.borderColor =
              color.point.border;
          }
        }
      }
    },
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

      let colors = this.datas.map((x) => x.color);
      this.set.color(colors);

      this.set.interval(this.interval);

      chart.setOption(this.option);
    });
  }
}
