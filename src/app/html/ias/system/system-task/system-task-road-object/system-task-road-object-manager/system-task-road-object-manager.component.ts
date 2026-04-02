import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SystemTaskRoadObjectMapComponent } from '../system-task-road-object-map/system-task-road-object-map.component';
import { SystemTaskRoadObjectOperationComponent } from '../system-task-road-object-operation/system-task-road-object-operation.component';

@Component({
  selector: 'ias-system-task-road-object-manager',
  imports: [
    CommonModule,
    SystemTaskRoadObjectMapComponent,
    SystemTaskRoadObjectOperationComponent,
  ],
  templateUrl: './system-task-road-object-manager.component.html',
  styleUrl: './system-task-road-object-manager.component.less',
})
export class SystemTaskRoadObjectManagerComponent {}
