import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { ColorTool } from '../../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { ISystemTaskRoadObjectListItem } from '../system-task-road-object-list-item/system-task-road-object-list-item.model';

@Component({
  selector: 'ias-system-task-road-object-list-item-section',
  imports: [CommonModule],
  templateUrl: './system-task-road-object-list-item-section.component.html',
  styleUrl:
    '../system-task-road-object-list-item/system-task-road-object-list-item.component.less',
})
export class SystemTaskRoadObjectListItemSectionComponent {
  @Input('data') source?: RoadSection;
  @Output() position = new EventEmitter<RoadSection>();
  @Output() details = new EventEmitter<RoadSection>();
  @Output() delete = new EventEmitter<RoadSection>();
  @Input() selected = false;

  constructor(private language: LanguageTool) {}
  Language = Language;
  data?: RoadPointItem;
  color = {
    event_types: [''],
    object_types: [''],
  };
  ngOnInit(): void {
    if (this.source) {
      this.data = this.convert(this.source);
    }
  }

  private convert(data: RoadSection) {
    let item = new RoadPointItem(data);
    item.title = data.Name;

    if (data.ScheduleEnabled && data.Schedule) {
      item.schedule = Language.ScheduleSummary(data.Schedule.Days);
    } else {
      item.schedule = '全天';
    }

    item.type = {
      key: data.SectionType,
      value: this.language.road.section.RoadSectionTypes(data.SectionType),
    };
    if (data.RoadObjectTypes) {
      this.color.object_types = [];
      item.object_types = data.RoadObjectTypes.map((x, i) => {
        return {
          key: x,
          value: this.language.road.object.ObjectTypes(x),
        };
      });
    }
    if (data.EventTypes) {
      this.color.event_types = [];
      item.event_types = data.EventTypes.map((x, i) => {
        this.color.event_types.push(ColorTool.get.index(i + 1));
        return {
          key: x,
          value: this.language.event.EventType(x),
        };
      });
    }
    return item;
  }
  on = {
    position: () => {
      this.position.emit(this.source);
    },
    details: () => {
      this.details.emit(this.source);
    },
    delete: () => {
      this.delete.emit(this.source);
    },
  };
}

class RoadPointItem implements ISystemTaskRoadObjectListItem<RoadSection> {
  constructor(data: RoadSection) {
    this.data = data;
  }
  title = '';
  schedule = '';
  type!: KeyValue<number, Promise<string>>;
  object_types: KeyValue<number, Promise<string>>[] = [];
  event_types: KeyValue<number, Promise<string>>[] = [];
  data: RoadSection;
}
