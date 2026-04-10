import { CommonModule, KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoadObjectState } from '../../../../../../../common/data-core/enums/road/road-object/road-object-state.enum';
import { RoadObjectType } from '../../../../../../../common/data-core/enums/road/road-object/road-object-type.enum';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { MediumRequestService } from '../../../../../../../common/data-core/requests/services/medium/medium.service';
import { IconTool } from '../../../../../../../common/tools/icon-tool/icon.tool';
import { LanguageTool } from '../../../../../../../common/tools/language-tool/language.tool';
import { ISystemTaskRoadObjectListItem } from '../system-task-road-object-list-item/system-task-road-object-list-item.model';

@Component({
  selector: 'ias-system-task-road-object-list-item-object',
  imports: [CommonModule],
  templateUrl: './system-task-road-object-list-item-object.component.html',
  styleUrl:
    '../system-task-road-object-list-item/system-task-road-object-list-item.component.less',
})
export class SystemTaskRoadObjectListItemObjectComponent implements OnInit {
  @Input('data') source?: RoadObject;
  @Output() position = new EventEmitter<RoadObject>();
  @Output() details = new EventEmitter<RoadObject>();
  @Output() delete = new EventEmitter<RoadObject>();
  constructor(
    private medium: MediumRequestService,
    private language: LanguageTool
  ) {}

  data?: RoadObjectItem;
  color = '';
  icon = '';

  ngOnInit(): void {
    if (this.source) {
      this.data = this.convert(this.source);
      this.load.color(this.source.ObjectState);
      this.load.icon(this.source.ObjectType);
    }
  }

  private convert(data: RoadObject) {
    let item = new RoadObjectItem(data);
    item.title = data.Name;
    item.address = data.Address ?? '';
    if (data.ImageUrl) {
      item.picture = this.medium.picture(data.ImageUrl);
    }
    item.type = {
      key: data.ObjectType,
      value: this.language.road.object.ObjectTypes(data.ObjectType),
    };
    item.state = {
      key: data.ObjectState,
      value: this.language.road.object.ObjectStates(data.ObjectState),
    };
    return item;
  }

  private load = {
    color: (state: RoadObjectState) => {
      switch (state) {
        case RoadObjectState.None:
          this.color = 'green';
          break;
        case RoadObjectState.Normal:
          this.color = 'cyan';
          break;
        case RoadObjectState.Breakage:
          this.color = 'orange';
          break;
        case RoadObjectState.Disappear:
          this.color = 'redlight';
          break;

        default:
          break;
      }
    },
    icon: (type: RoadObjectType) => {
      this.icon = IconTool.RoadObjectType(type);
    },
  };

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
class RoadObjectItem implements ISystemTaskRoadObjectListItem<RoadObject> {
  constructor(data: RoadObject) {
    this.data = data;
  }
  title = '';
  picture = '';
  address = '';
  type?: KeyValue<number, Promise<string>>;
  state?: KeyValue<number, Promise<string>>;
  data: RoadObject;
}
