import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import { EnumTool } from '../../../../../../common/tools/enum-tool/enum.tool';
import { wait } from '../../../../../../common/tools/wait';
import { ContentHeaderComponent } from '../../../../share/header/content-header/content-header.component';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleFileManagerComponent } from '../../../system-module/system-module-file/system-module-file-manager/system-module-file-manager.component';
import { SystemModuleRoadObjectDetailsManagerComponent } from '../../../system-module/system-module-road-object/system-module-road-object-details/system-module-road-object-details-manager/system-module-road-object-details-manager.component';
import { SystemModuleRoadObjectTableBusiness } from '../../../system-module/system-module-road-object/system-module-road-object-table/system-module-road-object-table.business';
import { SystemModuleRoadObjectVideoManagerComponent } from '../../../system-module/system-module-road-object/system-module-road-object-video/system-module-road-object-video-manager/system-module-road-object-video-manager.component';
import { PickupModel } from '../../../system-module/system-module-road-object/system-module-road-object-video/system-module-road-object-video-manager/system-module-road-object-video-manager.model';
import { SystemModuleRoadPointDetailsManagerComponent } from '../../../system-module/system-module-road-point/system-module-road-point-details/system-module-road-point-details-manager/system-module-road-point-details-manager.component';
import { SystemModuleRoadPointTableBusiness } from '../../../system-module/system-module-road-point/system-module-road-point-table/system-module-road-point-table.business';
import { SystemModuleRoadSectionDetailsManagerComponent } from '../../../system-module/system-module-road-section/system-module-road-section-details/system-module-road-section-details-manager/system-module-road-section-details-manager.component';
import { SystemModuleRoadSectionTableBusiness } from '../../../system-module/system-module-road-section/system-module-road-section-table/system-module-road-section-table.business';
import { SystemModuleRoadSectionTableSource } from '../../../system-module/system-module-road-section/system-module-road-section-table/system-module-road-section-table.source';
import { SystemTaskRoadObjectFilterComponent } from '../system-task-road-object-filter/system-task-road-object-filter.component';
import { SystemTaskRoadObjectListContainerComponent } from '../system-task-road-object-list/system-task-road-object-list-container/system-task-road-object-list-container.component';
import { SystemTaskRoadObjectMapInfoComponent } from '../system-task-road-object-map-info/system-task-road-object-map-info.component';
import { SystemTaskRoadObjectMapComponent } from '../system-task-road-object-map/system-task-road-object-map.component';
import { SystemTaskRoadObjectManagerBusiness } from './system-task-road-object-manager.business';
import { SystemTaskRoadObjectHelper } from './system-task-road-object-manager.helper';
import {
  SystemTaskRoadController,
  SystemTaskRoadObjectManagerArgs,
  SystemTaskRoadObjectType,
} from './system-task-road-object-manager.model';
import { SystemTaskRoadObjectManagerWindow } from './window/system-task-road-object-manager.window';

@Component({
  selector: 'ias-system-task-road-object-manager',
  imports: [
    CommonModule,

    ContentHeaderComponent,
    WindowComponent,
    WindowConfirmComponent,
    PictureListComponent,
    SystemTaskRoadObjectMapComponent,
    SystemTaskRoadObjectFilterComponent,
    SystemTaskRoadObjectListContainerComponent,
    SystemModuleFileManagerComponent,
    SystemModuleRoadObjectVideoManagerComponent,
    SystemModuleRoadObjectDetailsManagerComponent,
    SystemModuleRoadPointDetailsManagerComponent,
    SystemModuleRoadSectionDetailsManagerComponent,
    SystemTaskRoadObjectMapInfoComponent,
  ],
  templateUrl: './system-task-road-object-manager.component.html',
  styleUrl: './system-task-road-object-manager.component.less',
  providers: [
    SystemModuleRoadSectionTableSource,
    SystemModuleRoadObjectTableBusiness,
    SystemModuleRoadPointTableBusiness,
    SystemModuleRoadSectionTableBusiness,
    SystemTaskRoadObjectManagerBusiness,
  ],
})
export class SystemTaskRoadObjectManagerComponent implements OnInit {
  constructor(private business: SystemTaskRoadObjectManagerBusiness) {
    this.init.types();
  }

  window = new SystemTaskRoadObjectManagerWindow(this);
  types: EnumNameValue<number>[] = [];

  Type = SystemTaskRoadObjectType;

  map = {
    focus: false,
    args: new SystemTaskRoadObjectManagerArgs(),
    road: new SystemTaskRoadController(),
    type: undefined as SystemTaskRoadObjectType | undefined,
    event: {
      itemover: new EventEmitter<RoadObject | RoadPoint | RoadSection>(),
      itemleave: new EventEmitter<RoadObject | RoadPoint | RoadSection>(),
    },
  };

  load(type?: SystemTaskRoadObjectType) {
    return new Promise<void>((resolve) => {
      switch (type) {
        case SystemTaskRoadObjectType.object:
          this.business.object
            .load(this.map.args.object)
            .then((x) => {
              this.map.road.object.datas = x;
            })
            .finally(resolve);
          break;
        case SystemTaskRoadObjectType.point:
          this.business.point
            .load(this.map.args.point)
            .then((x) => {
              this.map.road.point.datas = x;
            })
            .finally(resolve);
          break;
        case SystemTaskRoadObjectType.section:
          this.business.section
            .load(this.map.args.section)
            .then((x) => {
              this.map.road.section.datas = x;
            })
            .finally(resolve);
          break;
        default:
          let index = 3;
          this.business.object
            .load(this.map.args.object)
            .then((x) => {
              this.map.road.object.datas = x;
            })
            .finally(() => {
              index--;
            });
          this.business.point
            .load(this.map.args.point)
            .then((x) => {
              this.map.road.point.datas = x;
            })
            .finally(() => {
              index--;
            });
          this.business.section
            .load(this.map.args.section)
            .then((x) => {
              this.map.road.section.datas = x;
            })
            .finally(() => {
              index--;
            });
          wait(() => {
            return index == 0;
          }).then(() => {
            resolve();
          });
          break;
      }
    });
  }
  private init = {
    types: () => {
      let values = EnumTool.values(SystemTaskRoadObjectType);
      this.types = values.map<EnumNameValue<number>>((x) => {
        return {
          Name: SystemTaskRoadObjectHelper.language.type(x),
          Value: x,
        };
      });
    },
  };

  ngOnInit(): void {
    this.load();
    wait(() => {
      return (
        this.map.road.object.loaded &&
        this.map.road.point.loaded &&
        this.map.road.section.loaded
      );
    }).then((x) => {
      this.map.focus = true;
    });
  }

  on = {
    type: (value?: SystemTaskRoadObjectType) => {
      if (this.map.type === value) {
        this.map.type = undefined;
      } else {
        this.map.type = value;
      }

      for (const key in this.map.road) {
        if (this.map.type === undefined) {
          this.map.road[key].enabled = true;
        } else {
          this.map.road[key].enabled = this.map.type == this.map.road[key].type;
        }
      }

      this.map.args.clear();
    },
    search: () => {
      this.load(this.map.type).then((x) => {
        // setTimeout(() => {
        //   this.focus = true;
        // }, 0);
      });
    },
    create: (type: SystemTaskRoadObjectType) => {
      switch (type) {
        case SystemTaskRoadObjectType.object:
          this.window.details.object.data = undefined;
          this.window.details.object.show = true;
          break;
        case SystemTaskRoadObjectType.point:
          this.window.details.point.data = undefined;
          this.window.details.point.show = true;
          break;
        case SystemTaskRoadObjectType.section:
          this.window.details.section.data = undefined;
          this.window.details.section.show = true;
          break;
      }
    },
    select: (data: RoadObject | RoadPoint | RoadSection) => {
      this.map.road.object.selected = undefined;
      this.map.road.point.selected = undefined;
      this.map.road.section.selected = undefined;
      if (data instanceof RoadObject) {
        this.map.road.object.selected = data;
      } else if (data instanceof RoadPoint) {
        this.map.road.point.selected = data;
      } else if (data instanceof RoadSection) {
        this.map.road.section.selected = data;
      }
    },
    mouse: {
      hover: (data: RoadObject | RoadPoint | RoadSection) => {
        this.map.event.itemover.emit(data);
      },
      leave: (data: RoadObject | RoadPoint | RoadSection) => {
        this.map.event.itemleave.emit(data);
      },
    },
  };

  file = {
    on: {
      pickup: (data: PickupModel) => {
        this.window.details.object.data = undefined;
        this.window.details.object.show = true;
        setTimeout(() => {
          this.window.details.object.pickup.emit(data);
        }, 1);
      },
    },
  };
}
