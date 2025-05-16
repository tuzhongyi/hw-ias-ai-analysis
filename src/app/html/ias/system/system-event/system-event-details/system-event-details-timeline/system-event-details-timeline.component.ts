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
import { SystemEventDetailsTimelineBusiness } from './business/system-event-details-timeline.business';
import { SystemEventDetailsTimelineOptions } from './system-event-details-timeline.option';

@Component({
  selector: 'ias-system-event-details-timeline',
  imports: [],
  templateUrl: './system-event-details-timeline.component.html',
  styleUrl: './system-event-details-timeline.component.less',
  providers: [SystemEventDetailsTimelineBusiness],
})
export class SystemEventDetailsTimelineComponent
  implements OnInit, AfterViewInit
{
  @Input() data?: MobileEventRecord;
  @Input('load') _load?: EventEmitter<MobileEventRecord>;

  constructor(private business: SystemEventDetailsTimelineBusiness) {}

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

  private option: EChartsOption = SystemEventDetailsTimelineOptions;
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
