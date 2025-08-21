import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartAbstract } from '../../../../../../../common/tools/chart-tool/chart.abstract';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { wait } from '../../../../../../../common/tools/wait';
import { SystemMainCardTaskStatisticChartOption } from './system-main-card-task-statistic-chart.option';

@Component({
  selector: 'ias-system-main-card-task-statistic-chart',
  imports: [],
  templateUrl: './system-main-card-task-statistic-chart.component.html',
  styleUrl: './system-main-card-task-statistic-chart.component.less',
})
export class SystemMainCardTaskStatisticChartComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: ChartItem<string>[] = [];

  constructor() {
    super();
  }
  @ViewChild('system_main_card_task_statistic_chart')
  element?: ElementRef;
  option = SystemMainCardTaskStatisticChartOption;
  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
  }
  private change = {
    datas: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.datas);
      }
    },
  };

  ngAfterViewInit(): void {
    wait(
      () => {
        if (this.element) {
          let div = this.element.nativeElement as HTMLDivElement;
          return div.offsetHeight > 0;
        }
        return false;
      },
      () => {
        this.view();
      }
    );
  }
  ngOnDestroy(): void {
    this.destroy();
  }

  private set(xAxis: string[], datas: number[]) {
    this.option.xAxis.data = xAxis;
    this.option.series[0].data = datas;
  }

  private load(datas: ChartItem<string>[]) {
    this.chart.get().then((chart) => {
      let xAxis = datas.map((x) => x.name);
      let values = datas.map((x) => x.value);
      this.set(xAxis, values);
      chart.setOption(this.option);
    });
  }
}
