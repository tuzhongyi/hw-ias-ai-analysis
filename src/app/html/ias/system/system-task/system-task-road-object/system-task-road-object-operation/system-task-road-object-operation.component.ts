import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import {
  SystemTaskRoadObjectManagerArgs,
  SystemTaskRoadObjectType,
} from '../system-task-road-object-manager/system-task-road-object-manager.model';
import { SystemTaskRoadObjectOperationSource } from './system-task-road-object-operation.source';

@Component({
  selector: 'ias-system-task-road-object-operation',
  imports: [CommonModule, FormsModule, HowellSelectComponent],
  templateUrl: './system-task-road-object-operation.component.html',
  styleUrl: './system-task-road-object-operation.component.less',
  providers: [SystemTaskRoadObjectOperationSource],
})
export class SystemTaskRoadObjectOperationComponent {
  @Input() args = new SystemTaskRoadObjectManagerArgs();
  constructor(public source: SystemTaskRoadObjectOperationSource) {}
  Type = SystemTaskRoadObjectType;
  on = {
    search: () => {},
  };
}
