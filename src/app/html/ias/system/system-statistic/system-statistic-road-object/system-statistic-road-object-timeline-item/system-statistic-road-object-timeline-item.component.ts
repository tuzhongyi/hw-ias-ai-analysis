import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';

@Component({
  selector: 'ias-system-statistic-road-object-timeline-item',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-timeline-item.component.html',
  styleUrl: './system-statistic-road-object-timeline-item.component.less',
})
export class SystemStatisticRoadObjectTimelineItemComponent implements OnInit {
  @Input() data?: RoadObjectEventRecord;
  @Input() first = false;
  @Input() last = false;

  constructor(private language: LanguageTool) {}
  ngOnInit(): void {
    // this.language
    if (this.data) {
      this.language.road.object
        .ObjectTypes(this.data.RoadObjectType)
        .then((x) => {
          this.type = x;
        });
    }
  }

  type = '';
}
