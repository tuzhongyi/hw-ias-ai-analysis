import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileGpsItem } from '../../../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../../../common/data-core/models/arm/file/file-info.model';
import { RoadObject } from '../../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { SystemModuleRoadObjectVideoMapContainerComponent } from '../system-module-road-object-video-map-container/system-module-road-object-video-map-container.component';
import { SystemModuleRoadObjectVideoMapPositionComponent } from '../system-module-road-object-video-map-position/system-module-road-object-video-map-position.component';
import { SystemModuleRoadObjectVideoMapSettingsComponent } from '../system-module-road-object-video-map-settings/system-module-road-object-video-map-settings.component';

@Component({
  selector: 'ias-system-module-road-object-video-map-manager',
  imports: [
    CommonModule,
    SystemModuleRoadObjectVideoMapContainerComponent,
    SystemModuleRoadObjectVideoMapSettingsComponent,
    SystemModuleRoadObjectVideoMapPositionComponent,
  ],
  templateUrl: './system-module-road-object-video-map-manager.component.html',
  styleUrl: './system-module-road-object-video-map-manager.component.less',
})
export class SystemModuleRoadObjectVideoMapManagerComponent {
  @Input() objects: RoadObject[] = [];
  @Input() data?: FileInfo;
  @Input() to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<{
    start: FileGpsItem;
    end: FileGpsItem;
    percent: number;
  }>();
  @Output() loaded = new EventEmitter<FileGpsItem[]>();
  @Output() error = new EventEmitter<Error>();

  @Input() locationable = true;
  @Input() pickupable = true;
  @Input() roadable = true;

  @Output('current') _current = new EventEmitter<FileGpsItem>();
  @Output() pickup = new EventEmitter<[number, number]>();
  @Output() objectdblclick = new EventEmitter<RoadObject>();
  @Output() address = new EventEmitter<string>();

  rectified = false;
  position = {
    current: {
      fixed: false,
      data: undefined as [number, number] | undefined,
    },
    pickup: {
      fixed: false,
      data: undefined as [number, number] | undefined,
    },
  };
  current?: FileGpsItem;

  on = {
    trigger: (data: {
      start: FileGpsItem;
      end: FileGpsItem;
      percent: number;
    }) => {
      this.trigger.emit(data);
    },
    loaded: (datas: FileGpsItem[]) => {
      this.loaded.emit(datas);
    },
    error: (e: Error) => {
      this.error.emit(e);
    },

    current: (item: FileGpsItem) => {
      this.current = item;
      this._current.emit(item);
    },
    pickup: (data: [number, number]) => {
      this.pickup.emit(data);
    },
    object: {
      dblclick: (data: RoadObject) => {
        this.objectdblclick.emit(data);
      },
    },
    address: (address: string) => {
      this.address.emit(address);
    },
  };
}
