import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FileGpsItem } from '../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../common/data-core/models/arm/file/file-info.model.js';
import { SystemTaskFileDetailsAMapController } from './controller/system-task-file-details-amap.controller';
import { SystemTaskFileDetailsMapController } from './controller/system-task-file-details-map.controller';
import { SystemTaskFileDetailsMapBusiness } from './system-task-file-details-map.business.js';

@Component({
  selector: 'ias-system-task-file-details-map',
  imports: [CommonModule],
  templateUrl: './system-task-file-details-map.component.html',
  styleUrl: './system-task-file-details-map.component.less',
  providers: [
    SystemTaskFileDetailsAMapController,
    SystemTaskFileDetailsMapController,
    SystemTaskFileDetailsMapBusiness,
  ],
})
export class SystemTaskFileDetailsMapComponent implements OnInit {
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

  ngOnInit(): void {
    if (this._to) {
      this._to.subscribe((x) => {
        this.controller.to(x);
      });
    }
    this.controller.trigger.subscribe((x) => {
      this.trigger.emit(x);
    });
    this.controller.speed.subscribe((x) => {
      this.speed = x ?? 0;
    });

    if (this.data) {
      this.load(this.data);
    }
  }
  async load(data: FileInfo) {
    try {
      this.loading = true;
      this.hasdata = false;
      let datas = await this.business.load(data.FileName);
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
}
