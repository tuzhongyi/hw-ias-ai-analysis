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
import { SystemMainCardStatisticEventChartOption } from './system-main-card-statistic-event-chart.option';

@Component({
  selector: 'ias-system-main-card-statistic-event-chart',
  imports: [],
  templateUrl: './system-main-card-statistic-event-chart.component.html',
  styleUrl: './system-main-card-statistic-event-chart.component.less',
})
export class SystemMainCardStatisticEventChartComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: ChartItem<any>[] = [];
  @Input() option = Object.assign({}, SystemMainCardStatisticEventChartOption);
  constructor() {
    super();
  }
  @ViewChild('system_main_card_statistic_event_chart')
  element?: ElementRef;
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
    wait(() => {
      if (this.element) {
        let div = this.element.nativeElement as HTMLDivElement;
        return div.offsetHeight > 0;
      }
      return false;
    }).then(() => {
      this.view();
    });
  }
  ngOnDestroy(): void {
    this.destroy();
  }

  protected set(datas: ChartItem[]) {
    for (let i = 0; i < datas.length; i++) {
      const item = datas[i];

      let index = this.option.series[0].data.findIndex(
        (x: ChartItem) => x.id === item.id
      );
      if (index >= 0) {
        this.option.series[0].data[index] = item;
        this.option.series[1].data[index] = item;
      }
    }
  }

  private load(data: ChartItem[]) {
    this.chart.get().then((chart) => {
      this.set(data);
      chart.setOption(this.option);
    });
  }
}
