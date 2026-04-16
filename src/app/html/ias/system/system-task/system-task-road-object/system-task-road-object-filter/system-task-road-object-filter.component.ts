import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../../common/components/hw-select/select-control.component';
import { TextSpaceBetweenDirective } from '../../../../../../common/directives/text-space-between/text-space-between.directive';
import {
  SystemTaskRoadObjectManagerArgs,
  SystemTaskRoadObjectType,
} from '../system-task-road-object-manager/system-task-road-object-manager.model';
import { SystemTaskRoadObjectFilterSource } from './system-task-road-object-filter.source';

@Component({
  selector: 'ias-system-task-road-object-filter',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    HowellSelectComponent,
  ],
  templateUrl: './system-task-road-object-filter.component.html',
  styleUrl: './system-task-road-object-filter.component.less',
  providers: [SystemTaskRoadObjectFilterSource],
})
export class SystemTaskRoadObjectFilterComponent {
  @Input() type?: SystemTaskRoadObjectType;
  @Input() args = new SystemTaskRoadObjectManagerArgs();
  @Output() argsChange = new EventEmitter<SystemTaskRoadObjectManagerArgs>();
  @Output() search = new EventEmitter<SystemTaskRoadObjectManagerArgs>();
  @Output() create = new EventEmitter<SystemTaskRoadObjectType>();
  @Output() file = new EventEmitter<void>();

  constructor(public source: SystemTaskRoadObjectFilterSource) {}
  Type = SystemTaskRoadObjectType;
  on = {
    search: () => {
      this.search.emit(this.args);
    },
    create: () => {
      this.create.emit(this.type);
    },
    file: () => {
      this.file.emit();
    },
  };
}
