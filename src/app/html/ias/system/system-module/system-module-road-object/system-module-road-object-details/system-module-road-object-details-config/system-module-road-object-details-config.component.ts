import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { ObjectImageSamplingConfig } from '../../../../../../../common/data-core/models/arm/geographic/object-image-sampling-config.model';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { WheelInputNumberDirective } from '../../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { SystemModuleRoadObjectDetailsConfigSource } from './system-module-road-object-details-config.source';

@Component({
  selector: 'ias-system-module-road-object-details-config',
  imports: [
    CommonModule,
    FormsModule,
    TextSpaceBetweenDirective,
    HowellSelectComponent,
    WheelInputNumberDirective,
  ],
  templateUrl: './system-module-road-object-details-config.component.html',
  styleUrl: './system-module-road-object-details-config.component.less',
  providers: [SystemModuleRoadObjectDetailsConfigSource],
})
export class SystemModuleRoadObjectDetailsConfigComponent {
  @Input() operable = true;
  @Input() data = new ObjectImageSamplingConfig();
  @Output() dataChange = new EventEmitter<ObjectImageSamplingConfig>();

  constructor(public source: SystemModuleRoadObjectDetailsConfigSource) {}

  on = {
    change: () => {
      this.dataChange.emit(this.data);
    },
  };
}
