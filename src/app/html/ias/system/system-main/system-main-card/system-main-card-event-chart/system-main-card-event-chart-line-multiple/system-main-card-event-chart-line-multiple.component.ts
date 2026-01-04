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
  ChartType,
  IChartColor,
  IChartData,
} from '../../../../../../../common/tools/chart-tool/chart.model';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { SystemMainCardEventChartLineEChartOption } from '../system-main-card-event-chart-line-container/system-main-card-event-chart-line-container-echart.option';

@Component({
  selector: 'howell-system-main-card-event-chart-line-multiple',
  imports: [],
  templateUrl: './system-main-card-event-chart-line-multiple.component.html',
  styleUrl: './system-main-card-event-chart-line-multiple.component.less',
})
export class SystemMainCardEventChartLineMultipleComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: IChartData[] = [];
  @Input() type = ChartType.bar;
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
  @Input() option = Object.assign({}, SystemMainCardEventChartLineEChartOption);
  private sery = (this.option.series as any)[0];

  constructor() {
    super();
  }

  @ViewChild('chart') element?: ElementRef;

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
    data: (datas: IChartData[]) => {
      this.option.color = [];
      this.option.series = [];
      for (let i = 0; i < datas.length; i++) {
        const data = datas[i];
        let sery: any = ObjectTool.clone(this.sery);
        sery.type = this.type;
        sery.name = data.Name;
        sery.data = [...data.datas.map((x) => x.value)];
        switch (this.type) {
          case ChartType.line:
            if (data.color) {
              this.set.color.line(sery, data.color);
              this.option.color.push(data.color.line);
              // sery.markPoint.label = {
              //   formatter: (params: any) => {
              //     console.log(params);
              //     return params.data.value;
              //   },
              // };
              sery.markPoint = {};
            }
            break;
          case ChartType.bar:
            if (data.color) {
              this.set.color.bar(sery, data.color);
              this.option.color.push(data.color.line);
            }
            sery.markPoint = {};
            break;
          default:
            break;
        }

        this.option.series.push(sery);
      }
    },
    color: {
      line: (sery: any, color: IChartColor) => {
        if (color.area) {
          sery.areaStyle.color = color.area;
        }
        if (color.line) {
          sery.lineStyle.color = color.line;
        }
        if (color.point) {
          if (color.point.background) {
            sery.markPoint.itemStyle.color = color.point.background;
          }
          if (color.point.border) {
            sery.markPoint.itemStyle.borderColor = color.point.border;
          }
        }
      },
      bar: (sery: any, color: IChartColor) => {
        if (color.area) {
          if (!sery.itemStyle) {
            sery.itemStyle = {};
          }
          sery.itemStyle.color = color.area;
        }
      },
    },

    interval: (value: number) => {
      (this.option.xAxis as any).axisLabel.interval = value;
    },
    tooltip: () => {
      this.option.tooltip = {
        trigger: 'axis',
        formatter: (params: any) => {
          let result = `${params[0].axisValue}<br />`;

          for (let i = 0; i < params.length; i++) {
            const item = params[i];
            let index = item.axisIndex;
            let value = `${item.data}`;
            if (this.datas.length > index) {
              let data = this.datas[index];
              value = `${item.data}${data.unit}`;
              if (data.format) {
                value = data.format(item.data);
              }
            }
            result += `${item.marker}${item.seriesName} ${value}<br />`;
          }

          return result;
        },
        axisPointer: {
          show: false,
        },
      };
    },
  };

  private load() {
    this.chart.get().then((chart) => {
      (this.option.xAxis as any).data = [...this.xAxis];
      this.set.data(this.datas);
      this.set.interval(this.interval);
      this.set.tooltip();
      this.option.legend = {
        data: this.datas.map((x) => x.Name),
        right: 0,
        top: 0,
        orient: 'vertical',
        textStyle: {
          color: '#bdd3ff',
        },
      };
      chart.setOption(this.option);
    });
  }
}
