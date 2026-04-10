import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { IconTool } from '../../../../../../common/tools/icon-tool/icon.tool';
import { LanguageTool } from '../../../../../../common/tools/language-tool/language.tool';
import { ObjectTool } from '../../../../../../common/tools/object-tool/object.tool';

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
  @Input() selected = false;

  constructor(private language: LanguageTool) {}
  ngOnInit(): void {
    if (this.data) {
      this.type.load(this.data);
      this.event.load(this.data);
    }
  }

  type = {
    icon: '',
    name: '',
    load: (data: RoadObjectEventRecord) => {
      this.type.icon = IconTool.RoadObjectType(data.RoadObjectType);
      this.language.road.object.ObjectTypes(data.RoadObjectType).then((x) => {
        this.type.name = x;
      });
    },
  };

  event = {
    color: '',
    name: '',
    load: (data: RoadObjectEventRecord) => {
      this.event.color = ObjectTool.model.RoadObjectEventRecord.get.color.event(
        data.EventType
      );
      this.language.road.object.EventTypes(data.EventType).then((x) => {
        this.event.name = x;
      });
    },
  };
}
