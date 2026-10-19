import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChartItem } from '../../../../../../../common/tools/chart-tool/chart.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { DateTimeTool } from '../../../../../../../common/tools/date-time-tool/datetime.tool';
import {
  Duration,
  DurationUnit,
} from '../../../../../../../common/tools/date-time-tool/duration.model';
import { SystemMainCardContainerComponent } from '../../system-main-card-container/system-main-card-container.component';
import { SystemMainCardEventRealtimeStatisticChartComponent } from '../system-main-card-event-realtime-statistic-chart/system-main-card-event-realtime-statistic-chart.component';
import { SystemMainCardEventRealtimeStatisticBusiness } from './system-main-card-event-realtime-statistic.business';

@Component({
  selector: 'ias-system-main-card-event-realtime-statistic',
  imports: [
    CommonModule,
    FormsModule,
    SystemMainCardContainerComponent,
    SystemMainCardEventRealtimeStatisticChartComponent,
  ],
  templateUrl: './system-main-card-event-realtime-statistic.component.html',
  styleUrl: './system-main-card-event-realtime-statistic.component.less',
  providers: [SystemMainCardEventRealtimeStatisticBusiness],
})
export class SystemMainCardEventRealtimeStatisticComponent
  implements OnInit, OnDestroy
{
  @Input('load') _load?: EventEmitter<void>;
  @Input() duration = DateTimeTool.last.month(new Date());
  @Output() durationChange = new EventEmitter<Duration>();
  @Output() type = new EventEmitter<number>();
  constructor(private business: SystemMainCardEventRealtimeStatisticBusiness) {}
  title = '本月实时事件统计';

  datas: ChartItem[] = [];
  color = [
    '#e91e63',
    '#1e90ff',
    '#01edf5',
    '#28ce38',
    '#9d4edd',
    '#ff3b30',
    '#ff762c',
    '#ffd700',
    '#23e353',
  ];
  /**
   * 两列时行与行之间的空隙（px），一列时不用。
   * 条数适中（正好摊成两列、行数不多）时行与行挨近一点才不显得散。
   */
  private readonly itemGap = 6;
  /** 两列之间横向的空隙（px）：比行距宽一点，两列才分得开 */
  private readonly columnGap = 12;

  style = {
    statistic: {
      gap: '20px',
    },
    info: {
      gap: '',
      padding: '',
      flexWrap: '',
      justifyContent: 'space-around',
      transform: '',
      width: '',
      height: '',
      item: {
        height: '',
      },
    },
    chart: {
      width: '',
    },

    /**
     * 一列最多摆 8 条，再多就摊成两列，并随条数整体缩小 info、把宽度往 info 这边挪。
     */
    load: (count: number) => {
      // 一列摆不下才分两列
      let columns = count > 8 ? 2 : 1;
      // 每列的行数 —— 它决定每条能分到多高
      let rows = Math.max(1, Math.ceil(count / columns));

      this.style.statistic.gap = columns > 1 ? '0px' : '20px';
      this.style.info.flexWrap = columns > 1 ? 'wrap' : '';
      // 一列时条数少，整块垂直居中；两列时每条的高度已经把整列等分满了，居中看不出区别
      this.style.info.justifyContent = columns > 1 ? 'flex-start' : 'center';
      this.style.info.height = '';
      // 列与列之间的空隙交给容器的 gap；一列时不需要。
      // 列方向容器里 gap 的两个值依次是 行距、列距
      this.style.info.gap =
        columns > 1 ? `${this.itemGap}px ${this.columnGap}px` : '';
      // 右侧统一留 20px，数值不贴到环形图上；
      // 两列时上下再各留 10px，首尾两条不顶着面板边
      this.style.info.padding = columns > 1 ? '10px 20px 10px 0' : '0 20px 0 0';
      // 一列时每条用自己的高度；两列时按行数等分，行与行之间的 gap 要先扣掉
      this.style.info.item.height =
        columns > 1
          ? `calc((100% - ${(rows - 1) * this.itemGap}px) / ${rows})`
          : '';

      if (columns > 1) {
        // 只缩不平移，锚点在 .less 里定成 left center：往左收，右边不会溢出去
        this.style.info.transform = `scale(${this.scale(count)})`;
      } else {
        this.style.info.transform = '';
      }

      // info 要装两列，所以比一列时宽；chart 的份额不能低于 40，否则环形图摆不下
      let info = this.width(count);
      this.style.info.width = `calc((100% - ${this.style.statistic.gap}) * ${info / 100})`;
      this.style.chart.width = `calc((100% - ${this.style.statistic.gap}) * ${(100 - info) / 100})`;
    },
  };

  /**
   * 两列时 info 的缩放：每条只分到半个宽度，先缩一点，条数越多越小。
   * 9 条起才分两列，所以拿 9 当起点；0.8 是下限，再小字就看不清了。
   */
  private scale(count: number): number {
    return this.round(Math.max(0.8, Math.min(1, 8 / count)));
  }

  /** info 的宽度百分比：一列时和 chart 平分（50），两列时更宽（60，chart 保底 40） */
  private width(count: number): number {
    return count > 8 ? 60 : 50;
  }

  /** 拼进 transform / calc 的数字，留三位小数就够了，免得浮点数带出一长串 */
  private round(value: number): number {
    return Math.round(value * 1000) / 1000;
  }

  private subscription = new Subscription();
  ngOnInit(): void {
    this.regist();
    this.load();
  }
  private regist() {
    if (this._load) {
      this.subscription.add(
        this._load.subscribe(() => {
          this.load();
        }),
      );
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load() {
    this.business.load(this.duration).then((datas) => {
      this.color = datas.map((x) => `${ColorTool.get.index(x.id, 10)}`);
      this.datas = datas;
      this.style.load(datas.length);
    });
  }

  on = {
    click: (item: ChartItem) => {
      this.type.emit(item.id);
    },
  };
  unit = {
    value: DurationUnit.month,
    Type: DurationUnit,
    change: () => {
      let today = new Date();
      switch (this.unit.value) {
        case DurationUnit.month:
          this.duration = DateTimeTool.last.month(today);
          break;
        case DurationUnit.week:
          this.duration = DateTimeTool.last.week(today);
          break;
        case DurationUnit.day:
          this.duration = DateTimeTool.all.day(today);
          break;

        default:
          break;
      }
      this.load();
      this.durationChange.emit(this.duration);
    },
  };
}
