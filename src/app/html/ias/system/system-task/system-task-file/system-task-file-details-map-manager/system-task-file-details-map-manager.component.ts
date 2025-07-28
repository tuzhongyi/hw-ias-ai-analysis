import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { FileInfo } from '../../../../../../common/data-core/models/arm/file/file-info.model';
import { AMapInputTipItem } from '../../../../../../common/helper/map/amap.model';
import { SystemMapSearchComponent } from '../../../system-map/system-map-search/system-map-search.component';
import { SystemTaskFileDetailsMapPanelPositionComponent } from '../system-task-file-details-map-panel/system-task-file-details-map-panel-position/system-task-file-details-map-panel-position.component';
import { SystemTaskFileDetailsMapPanelSearchResultListComponent } from '../system-task-file-details-map-panel/system-task-file-details-map-panel-search-result-list/system-task-file-details-map-panel-search-result-list.component';
import { SystemTaskFileDetailsMapPanelSearchResultListArgs } from '../system-task-file-details-map-panel/system-task-file-details-map-panel-search-result-list/system-task-file-details-map-panel-search-result-list.model';
import { SystemTaskFileDetailsMapPanelSettingsComponent } from '../system-task-file-details-map-panel/system-task-file-details-map-panel-settings/system-task-file-details-map-panel-settings.component';
import { SystemTaskFileDetailsMapPanelSpeedComponent } from '../system-task-file-details-map-panel/system-task-file-details-map-panel-speed/system-task-file-details-map-panel-speed.component';
import { SystemTaskFileDetailsMapComponent } from '../system-task-file-details-map/system-task-file-details-map.component';

@Component({
  selector: 'ias-system-task-file-details-map-manager',
  imports: [
    CommonModule,
    SystemTaskFileDetailsMapComponent,
    SystemMapSearchComponent,
    SystemTaskFileDetailsMapPanelSettingsComponent,
    SystemTaskFileDetailsMapPanelSpeedComponent,
    SystemTaskFileDetailsMapPanelPositionComponent,
    SystemTaskFileDetailsMapPanelSearchResultListComponent,
  ],
  templateUrl: './system-task-file-details-map-manager.component.html',
  styleUrl: './system-task-file-details-map-manager.component.less',
})
export class SystemTaskFileDetailsMapManagerComponent {
  @Input() data?: FileInfo;
  @Input() task?: AnalysisTask;
  @Input() to?: EventEmitter<number>;
  @Output() trigger = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<void>();
  @Output() error = new EventEmitter<Error>();

  @Input() videosync = true;
  @Output() videosyncChange = new EventEmitter<boolean>();

  @Input() searchable = false;
  @Input() locationable = false;
  @Input() pickupable = false;
  @Input() videomultiple = false;

  speed = 0;
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
    copied: {
      data: [] as [number, number][],
      on: (data: [number, number]) => {
        let datas = [...this.position.copied.data, data];
        this.position.copied.data = datas;
      },
    },
  };

  on = {
    search: (text: string) => {
      this.search.args.name = text;
      this.search.args.position = this.position.current.data;
      this.search.load.emit(this.search.args);

      this.search.show = !!text;
    },
    video: {
      sync: (value: boolean) => {
        this.videosync = value;
        this.videosyncChange.emit(this.videosync);
      },
    },
    trigger: (data: FileGpsItem) => {
      this.trigger.emit(data);
    },
    loaded: (datas: FileGpsItem[]) => {
      this.loaded.emit();
    },
    error: (e: Error) => {
      this.error.emit(e);
    },
  };
  search = {
    show: false,
    args: new SystemTaskFileDetailsMapPanelSearchResultListArgs(),
    load: new EventEmitter<SystemTaskFileDetailsMapPanelSearchResultListArgs>(),
    datas: [] as AMapInputTipItem[],
    loaded: (datas: AMapInputTipItem[]) => {
      this.search.datas = datas;
    },
    trigger: {
      over: new EventEmitter<AMapInputTipItem>(),
      out: new EventEmitter<AMapInputTipItem>(),
      click: new EventEmitter<AMapInputTipItem>(),
    },
    on: {
      over: (data: AMapInputTipItem) => {
        this.search.trigger.over.emit(data);
      },
      out: (data: AMapInputTipItem) => {
        this.search.trigger.out.emit(data);
      },
      click: (data: AMapInputTipItem) => {
        this.search.trigger.click.emit(data);
      },
    },
  };
}
