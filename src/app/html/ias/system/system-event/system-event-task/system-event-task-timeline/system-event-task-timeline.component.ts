import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { MobileEventRecord } from '../../../../../../common/data-core/models/arm/event/mobile-event-record.model';
import { wait } from '../../../../../../common/tools/wait';
import { SystemEventTaskTimelineBusiness } from './business/system-event-task-timeline.business';
import { SystemEventTaskTimelineOptions } from './system-event-task-timeline.option';

@Component({
  selector: 'ias-system-event-task-timeline',
  imports: [],
  templateUrl: './system-event-task-timeline.component.html',
  styleUrl: './system-event-task-timeline.component.less',
  providers: [SystemEventTaskTimelineBusiness],
})
export class SystemEventTaskTimelineComponent implements OnInit, AfterViewInit {
  @Input() data?: MobileEventRecord;
  @Input('load') _load?: EventEmitter<MobileEventRecord>;

  constructor(private business: SystemEventTaskTimelineBusiness) {}

  @ViewChild('echarts')
  private _element?: ElementRef<HTMLDivElement>;
  private get element() {
    return new Promise<ElementRef<HTMLDivElement>>((resolve) => {
      wait(
        () => {
          return !!this._element;
        },
        () => {
          resolve(this._element!);
        }
      );
    });
  }

  private option: EChartsOption = SystemEventTaskTimelineOptions;
  private echarts?: echarts.ECharts;

  ngOnInit(): void {
    if (this._load) {
      this._load.subscribe((data) => {
        this.load(data);
      });
    }
  }
  ngAfterViewInit(): void {
    this.element.then((x) => {
      this.echarts = echarts.init(x.nativeElement);
      if (this.data) {
        this.load(this.data);
      }
    });
  }

  private load(data: MobileEventRecord) {
    let models = this.business.load(data);
    let serie = (this.option.series as any)[0];
    let visual = this.option.visualMap as any;
    let count = 0;
    models.forEach((model) => {
      if (model.name) {
        count++;
      }
    });

    visual.pieces[0].lte = count - 1;
    serie.data = [...models];
    if (this.echarts) {
      this.echarts.setOption(this.option);
    }
  }
}
