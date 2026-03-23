import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RoadObjectEventType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-event-type.enum';
import { RoadObjectEventRecord } from '../../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { ObjectTool } from '../../../../../../../common/tools/object-tool/object.tool';
import { wait } from '../../../../../../../common/tools/wait';

@Component({
  selector: 'ias-system-statistic-road-object-map-info-simple',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map-info-simple.component.html',
  styleUrl: './system-statistic-road-object-map-info-simple.component.less',
})
export class SystemStatisticRoadObjectMapInfoSimpleComponent implements OnInit {
  @Input() data?: RoadObjectEventRecord;

  constructor(private language: LanguageTool) {}
  @ViewChild('icon') icon?: ElementRef<HTMLDivElement>;
  color = '';
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
    icon: async (data: RoadObjectEventRecord) => {
      await wait(() => {
        return !!this.icon;
      });

      if (this.icon) {
        let color = ObjectTool.model.RoadObjectEventRecord.get.color.event(
          data.EventType
        );
        let icon = ObjectTool.model.RoadObjectEventRecord.get.icon.inner(
          data.RoadObjectType
        );
        let svg = ObjectTool.model.RoadObjectEventRecord.get.icon.svg(
          14,
          color,
          icon
        );
        this.icon.nativeElement.insertAdjacentHTML('beforeend', svg);
      }
    },
  };
}
