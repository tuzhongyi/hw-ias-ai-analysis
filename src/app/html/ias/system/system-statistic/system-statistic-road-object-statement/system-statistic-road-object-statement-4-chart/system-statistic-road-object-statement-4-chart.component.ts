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
import { ChartAbstract } from '../../../../../../common/tools/chart-tool/chart.abstract';
import { wait } from '../../../../../../common/tools/wait';
import { RoadObjectStatementModel } from '../system-statistic-road-object-statement.model';
import { SystemStatisticRoadObjectStatement4ChartOption } from './system-statistic-road-object-statement-4-chart.option';

@Component({
  selector: 'ias-system-statistic-road-object-statement-4-chart',
  imports: [],
  templateUrl:
    './system-statistic-road-object-statement-4-chart.component.html',
  styleUrl: './system-statistic-road-object-statement-4-chart.component.less',
})
export class SystemStatisticRoadObjectStatement4ChartComponent
  extends ChartAbstract
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() datas: RoadObjectStatementModel[] = [];

  constructor() {
    super();
  }

  @ViewChild('system_statistic_road_object_statement_4_chart')
  override element?: ElementRef<HTMLDivElement>;
  private option = Object.assign(
    {},
    SystemStatisticRoadObjectStatement4ChartOption
  );

  ngOnInit(): void {
    this.init();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
  }
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

  private change = {
    datas: (simple: SimpleChange) => {
      if (simple && !simple.firstChange) {
        this.load(this.datas);
      }
    },
  };
  private load(models: RoadObjectStatementModel[]) {
    this.chart.get().then((chart) => {
      let datas = models.map((x) => ({ name: x.name, value: x.value }));
      this.set(datas);
      chart.setOption(this.option);
    });
  }
  private set(datas: { value: number; name: string }[]) {
    this.option.series[0].data = datas;
    let count = 0;
    datas.forEach((x) => {
      count += x.value;
    });
    this.option.series[0].label.formatter = () => {
      return count;
    };
  }
}
