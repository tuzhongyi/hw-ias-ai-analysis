import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { WindowConfirmComponent } from '../../../../../../common/components/window-confirm/window-confirm.component';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { PictureListComponent } from '../../../../share/picture/picture-list/picture-list.component';
import { WindowComponent } from '../../../../share/window/component/window.component';
import { SystemModuleFileManagerComponent } from '../../system-module-file/system-module-file-manager/system-module-file-manager.component';
import { SystemModuleRoadObjectDetailsManagerComponent } from '../system-module-road-object-details/system-module-road-object-details-manager/system-module-road-object-details-manager.component';
import { SystemModuleRoadObjectMapComponent } from '../system-module-road-object-map/system-module-road-object-map.component';
import { SystemModuleRoadObjectTableComponent } from '../system-module-road-object-table/system-module-road-object-table.component';
import { SystemModuleRoadObjectTableArgs } from '../system-module-road-object-table/system-module-road-object-table.model';
import { SystemModuleRoadObjectVideoManagerComponent } from '../system-module-road-object-video/system-module-road-object-video-manager/system-module-road-object-video-manager.component';
import { PickupModel } from '../system-module-road-object-video/system-module-road-object-video-manager/system-module-road-object-video-manager.model';
import { SystemModuleRoadObjectManagerBusiness } from './system-module-road-object-manager.business';
import { SystemModuleRoadObjectManagerSource } from './system-module-road-object-manager.source';
import { SystemModuleRoadObjectManagerWindow } from './window/system-module-road-object-manager.window';

@Component({
  selector: 'ias-system-module-road-object-manager',
  imports: [
    CommonModule,
    FormsModule,
    HowellSelectComponent,
    SystemModuleRoadObjectTableComponent,
    SystemModuleRoadObjectMapComponent,
    SystemModuleRoadObjectDetailsManagerComponent,
    WindowComponent,
    WindowConfirmComponent,
    SystemModuleFileManagerComponent,
    SystemModuleRoadObjectVideoManagerComponent,
    PictureListComponent,
  ],
  templateUrl: './system-module-road-object-manager.component.html',
  styleUrl: './system-module-road-object-manager.component.less',
  providers: [
    SystemModuleRoadObjectManagerBusiness,
    SystemModuleRoadObjectManagerSource,
  ],
})
export class SystemModuleRoadObjectManagerComponent implements OnInit {
  @Input() iswindow = false;
  @Input() operable = true;
  constructor(
    private business: SystemModuleRoadObjectManagerBusiness,
    public source: SystemModuleRoadObjectManagerSource,
    private toastr: ToastrService
  ) {}

  window = new SystemModuleRoadObjectManagerWindow(this);

  ngOnInit(): void {}

  search() {
    this.table.args.first = true;
    this.table.load.emit(this.table.args);
  }
  reload() {
    this.table.args.first = false;
    this.table.load.emit(this.table.args);
    this.window.video.load.emit();
  }

  table = {
    args: new SystemModuleRoadObjectTableArgs(),
    load: new EventEmitter<SystemModuleRoadObjectTableArgs>(),
    datas: [] as RoadObject[],
    selected: {
      all: [] as RoadObject[],
      current: undefined as RoadObject | undefined,
    },
    picture: {
      page: new EventEmitter<number>(),
    },
    on: {
      load: (x: RoadObject[]) => {
        this.table.datas = x;
      },
      select: (data: RoadObject[]) => {
        this.table.selected.all = [...data];
      },
      position: (data: RoadObject) => {
        this.table.selected.current = data;
      },

      item: {
        over: (item: RoadObject) => {
          this.map.over.emit(item);
        },
        out: (item: RoadObject) => {
          this.map.out.emit(item);
        },
      },
    },
  };

  map = {
    over: new EventEmitter<RoadObject>(),
    out: new EventEmitter<RoadObject>(),
  };

  delete = {
    confirm: () => {
      if (this.table.selected.all.length > 0) {
        this.window.confirm.count = this.table.selected.all.length;
        this.window.confirm.show = true;
      }
    },
    ok: () => {
      if (this.table.selected.all.length > 0) {
        this.business
          .delete(this.table.selected.all)
          .then(() => {
            this.table.selected.all = [];
            this.table.selected.current = undefined;
            this.table.args.first = false;
            this.table.load.emit(this.table.args);
            this.window.confirm.show = false;
            this.toastr.success('删除成功');
          })
          .catch((x) => {
            this.toastr.error('删除失败');
          });
      }
    },
    cancel: () => {
      this.window.confirm.show = false;
    },
  };

  file = {
    on: {
      pickup: (data: PickupModel) => {
        this.window.details.data = undefined;
        this.window.details.show = true;
        setTimeout(() => {
          this.window.details.pickup.emit(data);
        }, 1);
      },
    },
  };
}
