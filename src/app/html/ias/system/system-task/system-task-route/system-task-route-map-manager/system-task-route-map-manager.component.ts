import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { FileGpsItem } from '../../../../../../common/data-core/models/arm/file/file-gps-item.model';
import { ShopRegistration } from '../../../../../../common/data-core/models/arm/geographic/shop-registration.model';
import { SystemTaskRouteMapComponent } from '../system-task-route-map/system-task-route-map.component';

@Component({
  selector: 'ias-system-task-route-map-manager',
  imports: [CommonModule, SystemTaskRouteMapComponent],
  templateUrl: './system-task-route-map-manager.component.html',
  styleUrl: './system-task-route-map-manager.component.less',
})
export class SystemTaskRouteMapManagerComponent {
  @Input() data?: AnalysisTask;
  @Output() current = new EventEmitter<FileGpsItem>();
  @Output() loaded = new EventEmitter<ShopRegistration>();

  on = {
    current: (data: FileGpsItem) => {
      this.current.emit(data);
    },
    loaded: (data: ShopRegistration) => {
      this.loaded.emit(data);
    },
  };
}
