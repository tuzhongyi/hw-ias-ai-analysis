import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RoadObjectEventType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { IconTool } from '../../../../../../../common/tools/icon-tool/icon.tool';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';

@Component({
  selector: 'ias-system-statistic-road-object-map-info-simple',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map-info-simple.component.html',
  styleUrl: './system-statistic-road-object-map-info-simple.component.less',
})
export class SystemStatisticRoadObjectMapInfoSimpleComponent implements OnInit {
  @Input() data?: RoadObjectEventRecord;
  @Input() anchor: 'top' | 'bottom' = 'bottom';

  constructor(private language: LanguageTool) {}

  color = '';
  icon = '';
  name = {
    type: '',
    event: '',
  };

  ngOnInit(): void {
    if (this.data) {
      switch (this.data.EventType) {
        case RoadObjectEventType.Inspection:
          this.color = 'green';
          break;
        case RoadObjectEventType.Breakage:
          this.color = 'yellow';
          break;
        case RoadObjectEventType.Disappear:
          this.color = 'redlight';
          break;
        default:
          this.color = '';
          break;
      }
      this.language.road.object.EventTypes(this.data.EventType).then((x) => {
        this.name.event = x;
      });
      this.language.road.object
        .ObjectTypes(this.data.RoadObjectType)
        .then((x) => {
          this.name.type = x;
        });

      this.load.icon(this.data);
    }
  }

  private load = {
    icon: (data: RoadObjectEventRecord) => {
      this.icon = IconTool.RoadObjectType(data.RoadObjectType);
    },
  };
}
