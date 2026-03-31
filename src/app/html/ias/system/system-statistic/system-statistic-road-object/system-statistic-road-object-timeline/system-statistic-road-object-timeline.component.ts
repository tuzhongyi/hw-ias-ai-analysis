import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { WheelHorizontalScrollDirective } from '../../../../../../common/directives/wheel-horizontal-scroll/wheel-horizontal-scroll.directive';
import { SystemStatisticRoadObjectTimelineItemComponent } from '../system-statistic-road-object-timeline-item/system-statistic-road-object-timeline-item.component';
import { SystemStatisticRoadObjectTimelineScrollComponent } from '../system-statistic-road-object-timeline-scroll/system-statistic-road-object-timeline-scroll.component';

@Component({
  selector: 'ias-system-statistic-road-object-timeline',
  imports: [
    CommonModule,
    WheelHorizontalScrollDirective,
    SystemStatisticRoadObjectTimelineItemComponent,
    SystemStatisticRoadObjectTimelineScrollComponent,
  ],
  templateUrl: './system-statistic-road-object-timeline.component.html',
  styleUrl: './system-statistic-road-object-timeline.component.less',
})
export class SystemStatisticRoadObjectTimelineComponent {
  @Input() datas: RoadObjectEventRecord[] = [];
  @Input() selected?: RoadObjectEventRecord;
  @Output() selectedChange = new EventEmitter<RoadObjectEventRecord>();

  constructor() {}

  position: number = 0;

  @ViewChildren('timelineitem')
  set elements(list: QueryList<ElementRef<HTMLDivElement>>) {
    this.items = list.toArray().map((x) => x.nativeElement);
  }
  @ViewChild('timeline')
  container?: ElementRef<HTMLDivElement>;

  items: HTMLDivElement[] = [];

  get scroll_display() {
    if (this.container) {
      return (
        this.container.nativeElement.scrollWidth >
        this.container.nativeElement.clientWidth
      );
    }
    return false;
  }

  on = {
    click: (data: RoadObjectEventRecord) => {
      this.selected = data;
      this.selectedChange.emit(this.selected);
    },
    position: (value: number) => {
      setTimeout(() => {
        this.position = value;
      }, 0);
    },
    drag: (value: number) => {
      setTimeout(() => {
        this.position = value;
      }, 0);
    },
  };
}
