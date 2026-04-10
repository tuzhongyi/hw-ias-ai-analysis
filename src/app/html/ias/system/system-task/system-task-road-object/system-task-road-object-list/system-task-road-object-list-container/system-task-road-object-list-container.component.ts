import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from '../../../../../../../common/components/paginator/paginator.component';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../../common/data-core/models/arm/geographic/road-section.model';
import {
  Page,
  PagedList,
} from '../../../../../../../common/data-core/models/interface/page-list.model';
import { SystemMainCardContainerComponent } from '../../../../system-main/system-main-card/system-main-card-container/system-main-card-container.component';
import { SystemTaskRoadObjectHelper } from '../../system-task-road-object-manager/system-task-road-object-manager.helper';
import { SystemTaskRoadObjectType } from '../../system-task-road-object-manager/system-task-road-object-manager.model';

import { SystemTaskRoadObjectListItemObjectComponent } from '../system-task-road-object-list-item-object/system-task-road-object-list-item-object.component';
import { SystemTaskRoadObjectListItemPointComponent } from '../system-task-road-object-list-item-point/system-task-road-object-list-item-point.component';
import { SystemTaskRoadObjectListItemSectionComponent } from '../system-task-road-object-list-item-section/system-task-road-object-list-item-section.component';

@Component({
  selector: 'ias-system-task-road-object-list-container',
  imports: [
    CommonModule,
    FormsModule,
    PaginatorComponent,
    SystemMainCardContainerComponent,
    SystemTaskRoadObjectListItemObjectComponent,
    SystemTaskRoadObjectListItemPointComponent,
    SystemTaskRoadObjectListItemSectionComponent,
  ],
  templateUrl: './system-task-road-object-list-container.component.html',
  styleUrl: './system-task-road-object-list-container.component.less',
})
export class SystemTaskRoadObjectListContainerComponent
  implements OnChanges, OnInit
{
  @Input() type?: SystemTaskRoadObjectType;
  @Input() objects: RoadObject[] = [];
  @Input() points: RoadPoint[] = [];
  @Input() sections: RoadSection[] = [];

  @Output() position = new EventEmitter<RoadObject | RoadPoint | RoadSection>();
  @Output() details = new EventEmitter<RoadObject | RoadPoint | RoadSection>();
  @Output() delete = new EventEmitter<RoadObject | RoadPoint | RoadSection>();
  @Output() close = new EventEmitter<void>();

  constructor() {}

  get title() {
    return SystemTaskRoadObjectHelper.language.type(this.type);
  }

  Type = SystemTaskRoadObjectType;

  page = Page.create(1, 4);
  data = {
    object: [] as RoadObject[],
    point: [] as RoadPoint[],
    section: [] as RoadSection[],
  };
  private inited = false;

  private change = {
    type: (simple: SimpleChange) => {
      if (simple && this.inited) {
        this.on.page(1);
      }
    },
    data: {
      object: (simple: SimpleChange) => {
        if (
          simple &&
          this.type == SystemTaskRoadObjectType.object &&
          this.inited
        ) {
          this.on.page(1);
        }
      },
      point: (simple: SimpleChange) => {
        if (
          simple &&
          this.type == SystemTaskRoadObjectType.point &&
          this.inited
        ) {
          this.on.page(1);
        }
      },
      section: (simple: SimpleChange) => {
        if (
          simple &&
          this.type == SystemTaskRoadObjectType.section &&
          this.inited
        ) {
          this.on.page(1);
        }
      },
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.type(changes['type']);
    this.change.data.object(changes['objects']);
    this.change.data.point(changes['points']);
    this.change.data.section(changes['sections']);
  }
  ngOnInit(): void {
    this.on.page(1);
    this.inited = true;
  }

  on = {
    page: (index: number) => {
      let paged: PagedList<any> | undefined = undefined;
      switch (this.type) {
        case SystemTaskRoadObjectType.object:
          paged = this.to.page(index, this.objects);
          if (paged) {
            this.page = paged.Page;
            this.data.object = paged.Data;
          }
          break;
        case SystemTaskRoadObjectType.point:
          paged = this.to.page(index, this.points);
          if (paged) {
            this.page = paged.Page;
            this.data.point = paged.Data;
          }
          break;
        case SystemTaskRoadObjectType.section:
          paged = this.to.page(index, this.sections);
          if (paged) {
            this.page = paged.Page;
            this.data.section = paged.Data;
          }
          break;

        default:
          break;
      }
    },

    position: (data: RoadObject | RoadPoint | RoadSection) => {
      this.position.emit(data);
    },
    details: (data: RoadObject | RoadPoint | RoadSection) => {
      this.details.emit(data);
    },
    delete: (data: RoadObject | RoadPoint | RoadSection) => {
      this.delete.emit(data);
    },
    close: () => {
      this.close.emit();
    },
  };

  to = {
    page: <T>(index: number, datas: T[]) => {
      let paged = PagedList.create(datas, index, this.get.size());
      if (paged.Data.length == 0 && paged.Page.PageIndex > 1) {
        this.on.page(paged.Page.PageIndex - 1);
        return undefined;
      }
      return paged;
    },
  };
  get = {
    size: () => {
      switch (this.type) {
        case SystemTaskRoadObjectType.object:
          return 5;
        case SystemTaskRoadObjectType.point:
          return 4;
        case SystemTaskRoadObjectType.section:
          return 5;

        default:
          return 5;
      }
    },
  };
}
