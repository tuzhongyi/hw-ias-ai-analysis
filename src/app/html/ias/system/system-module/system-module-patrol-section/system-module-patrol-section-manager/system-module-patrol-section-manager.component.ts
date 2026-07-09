import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeControlComponent } from '../../../../../../common/components/date-time-control/date-time-control.component';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { PatrolSection } from '../../../../../../common/data-core/models/arm/geographic/patrol/patrol-section.model';
import { MobileDevice } from '../../../../../../common/data-core/models/arm/mobile-device/mobile-device.model';
import { DateTimeTool } from '../../../../../../common/tools/date-time-tool/datetime.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemModulePatrolSectionInfoComponent } from '../system-module-patrol-section-info/system-module-patrol-section-info.component';
import { SystemModulePatrolSectionMapComponent } from '../system-module-patrol-section-map/system-module-patrol-section-map.component';
import { SystemModulePatrolSectionTableComponent } from '../system-module-patrol-section-table/system-module-patrol-section-table.component';
import {
  SystemModulePatrolSectionMapArgs,
  SystemModulePatrolSectionTableArgs,
} from '../system-module-patrol-section.model';
import { SystemModulePatrolSectionSource } from '../system-module-patrol-section.source';
import { SystemModulePatrolSectionController } from './controller/system-module-patrol-section-info.controller';

@Component({
  selector: 'ias-system-module-patrol-section-manager',
  imports: [
    CommonModule,
    FormsModule,
    DateTimeControlComponent,
    HowellSelectComponent,
    SystemModulePatrolSectionTableComponent,
    SystemModulePatrolSectionMapComponent,
    SystemModulePatrolSectionInfoComponent,
  ],
  templateUrl: './system-module-patrol-section-manager.component.html',
  styleUrl: './system-module-patrol-section-manager.component.less',
  providers: [SystemModulePatrolSectionSource],
})
export class SystemModulePatrolSectionManagerComponent
  implements OnChanges, OnInit
{
  @Input() deviceId?: string;
  @Input() iswindow = false;

  constructor(public source: SystemModulePatrolSectionSource) {}

  Language = Language;
  controller = new SystemModulePatrolSectionController(this);

  private change = {
    deviceId: (simple: SimpleChange) => {
      if (simple) {
        if (this.deviceId) {
          this.map.args.deviceId = this.deviceId;
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.deviceId(changes['deviceId']);
  }

  ngOnInit(): void {}

  manager = {
    data: {
      device: undefined as MobileDevice | undefined,

      date: new Date(),
      section: {
        datas: [] as PatrolSection[],
        selected: undefined as PatrolSection | undefined,
        hover: undefined as PatrolSection | undefined,
      },
    },

    on: {
      date: () => {
        this.map.args.duration = DateTimeTool.all.day(this.manager.data.date);
      },
    },
  };

  table = {
    args: new SystemModulePatrolSectionTableArgs(),
    load: new EventEmitter<SystemModulePatrolSectionTableArgs>(),
    on: {
      loaded: (datas: PatrolSection[]) => {
        this.manager.data.section.datas = datas;
      },
      search: () => {
        this.table.load.emit(this.table.args);
      },
      hover: (data?: PatrolSection) => {
        this.manager.data.section.hover = data;
      },
    },
  };

  map = {
    args: new SystemModulePatrolSectionMapArgs(),
    load: new EventEmitter<SystemModulePatrolSectionMapArgs>(),
    rectified: false,
    loaded: false,
    creater: undefined as [number, number][] | undefined,
    on: {
      loaded: () => {},
      load: () => {
        this.map.loaded = true;
        this.map.load.emit(this.map.args);
      },
      clear: () => {
        this.map.args.deviceId = undefined;
        this.map.on.load();
        this.map.loaded = false;
      },
      pick: {
        up: (data: [number, number][]) => {
          this.map.creater = data;
          this.controller.info.show = true;
        },
        cancel: () => {
          this.map.creater = undefined;
          this.controller.info.show = false;
        },
      },
    },
  };
}
