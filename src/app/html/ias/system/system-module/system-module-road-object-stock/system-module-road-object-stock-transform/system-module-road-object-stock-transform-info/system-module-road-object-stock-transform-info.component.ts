import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { RoadObject } from '../../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { TextSpaceBetweenDirective } from '../../../../../../../common/directives/text-space-between/text-space-between.directive';
import { WheelInputNumberDirective } from '../../../../../../../common/directives/wheel-input-number/wheel-input-number.directive';
import { SystemModuleRoadObjectSource } from '../../../system-module-road-object/system-module-road-object.source';

@Component({
  selector: 'ias-system-module-road-object-stock-transform-info',
  imports: [
    CommonModule,
    FormsModule,
    WheelInputNumberDirective,
    TextSpaceBetweenDirective,
    HowellSelectComponent,
  ],
  templateUrl:
    './system-module-road-object-stock-transform-info.component.html',
  styleUrl: './system-module-road-object-stock-transform-info.component.less',
  providers: [SystemModuleRoadObjectSource],
})
export class SystemModuleRoadObjectStockTransformInfoComponent implements OnInit {
  @Input() operable = true;
  @Input() data = new RoadObject();
  @Output() dataChange = new EventEmitter<RoadObject>();

  constructor(public source: SystemModuleRoadObjectSource) {}

  ngOnInit(): void {}

  on = {
    change: () => {
      this.dataChange.emit(this.data);
    },
  };
}
