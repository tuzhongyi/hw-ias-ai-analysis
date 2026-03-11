import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { WheelHorizontalScrollDirective } from '../../../../../../common/directives/wheel-horizontal-scroll/wheel-horizontal-scroll.directive';
import { SystemStatisticRoadObjectTimelineItemComponent } from '../system-statistic-road-object-timeline-item/system-statistic-road-object-timeline-item.component';

@Component({
  selector: 'ias-system-statistic-road-object-timeline',
  imports: [
    CommonModule,
    WheelHorizontalScrollDirective,
    SystemStatisticRoadObjectTimelineItemComponent,
  ],
  templateUrl: './system-statistic-road-object-timeline.component.html',
  styleUrl: './system-statistic-road-object-timeline.component.less',
})
export class SystemStatisticRoadObjectTimelineComponent {
  @Input() datas: RoadObjectEventRecord[] = [];
}
