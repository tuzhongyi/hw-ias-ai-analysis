import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { IASMapPanelSettingsComponent } from '../../../../share/map-panel/ias-map-panel-settings/ias-map-panel-settings.component';
import { SystemTaskFileDetailsMapPanelPositionComponent } from '../system-task-file-details-map-panel/system-task-file-details-map-panel-position/system-task-file-details-map-panel-position.component';
import { SystemTaskFileDetailsMapPanelSpeedComponent } from '../system-task-file-details-map-panel/system-task-file-details-map-panel-speed/system-task-file-details-map-panel-speed.component';
import { SystemTaskFileDetailsAMapController } from './controller/system-task-file-details-amap.controller';
import { SystemTaskFileDetailsMapController } from './controller/system-task-file-details-map.controller';
import { SystemTaskFileDetailsMapBusiness } from './system-task-file-details-map.business.js';

@Component({
  selector: 'ias-system-task-file-details-map',
  imports: [
    CommonModule,
    IASMapPanelSettingsComponent,
    SystemTaskFileDetailsMapPanelSpeedComponent,
    SystemTaskFileDetailsMapPanelPositionComponent,
  ],
  templateUrl: './system-task-file-details-map.component.html',
  styleUrl: './system-task-file-details-map.component.less',
  providers: [
    SystemTaskFileDetailsAMapController,
    SystemTaskFileDetailsMapController,
    SystemTaskFileDetailsMapBusiness,
  ],
})
export class SystemTaskFileDetailsMapComponent implements OnInit, OnDestroy {
  @Input() data?: FileInfo;
  @Input('to') _to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<void>();
  @Output() error = new EventEmitter<Error>();

  constructor(
    private business: SystemTaskFileDetailsMapBusiness,
    private controller: SystemTaskFileDetailsMapController
  ) {}

  loading = false;
  hasdata = false;
  speed = 0;
  rectified = false;
  position = {
    current: {
      fixed: false,
      data: undefined as [number, number] | undefined,
    },
    point: {
      fixed: false,
      data: undefined as [number, number] | undefined,
    },
  };

  ngOnInit(): void {
    if (this._to) {
      this._to.subscribe((x) => {
        this.controller.to(x);
      });
    }
    this.controller.event.trigger.subscribe((x) => {
      this.trigger.emit(x);
    });
    this.controller.event.speed.subscribe((x) => {
      this.speed = x ?? 0;
    });
    this.controller.event.position.subscribe((x) => {
      this.position.current.data = x;
    });
    this.controller.event.point.subscribe((x) => {
      this.position.point.data = x;
    });

    if (this.data) {
      this.load(this.data, this.rectified);
    }
  }
  async load(data: FileInfo, rectified: boolean) {
    try {
      this.loading = true;
      this.hasdata = false;
      let datas = await this.business.load(data.FileName, rectified);
      this.hasdata = datas.length > 0;
      this.loaded.emit();
      if (this.hasdata) {
        await this.controller.load(datas);
      }
    } catch (e: any) {
      this.error.emit(e);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.controller.destroy();
  }

  on = {
    rectified: (rectified: boolean) => {
      this.rectified = rectified;
      this.controller.clear().then((x) => {
        if (this.data) {
          this.business
            .load(this.data.FileName, this.rectified)
            .then((datas) => {
              this.controller.load(datas);
            });
        }
      });
    },
  };
}
