import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ias-system-statistic-road-object-timeline-scroll-bar',
  imports: [CommonModule],
  templateUrl:
    './system-statistic-road-object-timeline-scroll-bar.component.html',
  styleUrl: './system-statistic-road-object-timeline-scroll-bar.component.less',
})
export class SystemStatisticRoadObjectTimelineScrollBarComponent {
  @Input() begin = new Date();
  @Input() end = new Date();
}
