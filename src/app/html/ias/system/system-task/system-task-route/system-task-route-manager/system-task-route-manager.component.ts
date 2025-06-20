import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { SystemTaskRouteMapComponent } from '../system-task-route-map/system-task-route-map.component';
import { SystemTaskRouteStatisticComponent } from '../system-task-route-statistic/system-task-route-statistic.component';
import { ShopStatisticStatus } from '../system-task-route-statistic/system-task-route-statistic.model';

@Component({
  selector: 'ias-system-task-route-manager',
  imports: [
    CommonModule,
    SystemTaskRouteStatisticComponent,
    SystemTaskRouteMapComponent,
  ],
  templateUrl: './system-task-route-manager.component.html',
  styleUrl: './system-task-route-manager.component.less',
})
export class SystemTaskRouteManagerComponent {
  @Input() data?: AnalysisTask;
  @Output() current = new EventEmitter<FileGpsItem>();
  @Output() analysis = new EventEmitter<ShopStatisticStatus | undefined>();
  @Output() registration = new EventEmitter<boolean | undefined>();

  on = {
    current: (data: FileGpsItem) => {
      this.current.emit(data);
    },
    analysis: (type?: ShopStatisticStatus) => {
      this.analysis.emit(type);
    },
    registration: (associated?: boolean) => {
      this.registration.emit(associated);
    },
  };
}
