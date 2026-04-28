import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HowellSelectComponent } from '../../../../../../../common/components/hw-select/select-control.component';
import { SelectMultipleComponent } from '../../../../../../../common/components/select-multiple/select-multiple.component';
import { ObjectImageSamplingConfig } from '../../../../../../../common/data-core/models/arm/geographic/object-image-sampling-config.model';
import { IIdNameModel } from '../../../../../../../common/data-core/models/interface/model.interface';
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
    SelectMultipleComponent,
  ],
  templateUrl: './system-module-road-object-details-config.component.html',
  styleUrl: './system-module-road-object-details-config.component.less',
  providers: [SystemModuleRoadObjectDetailsConfigSource],
})
export class SystemModuleRoadObjectDetailsConfigComponent implements OnInit {
  @Input() operable = true;
  @Input() data = new ObjectImageSamplingConfig();
  @Output() dataChange = new EventEmitter<ObjectImageSamplingConfig>();

  @Output() course = new EventEmitter<number>();

  constructor(public source: SystemModuleRoadObjectDetailsConfigSource) {}

  ngOnInit(): void {
    this.camera.load(this.data);
  }

  on = {
    change: () => {
      this.dataChange.emit(this.data);
    },
    course: () => {
      this.course.emit(this.data.Course);
    },
  };

  camera = {
    sides: [
      { Id: 'Left', Name: '左侧' },
      { Id: 'Right', Name: '右侧' },
      { Id: 'Front', Name: '前方' },
      { Id: 'Back', Name: '后方' },
    ],
    selected: [] as IIdNameModel[],
    change: (datas: IIdNameModel[]) => {
      this.camera.selected = [...datas];
      this.data.CameraSides = this.camera.selected.map((i) => i.Id);
    },
    load: (data: ObjectImageSamplingConfig) => {
      if (data.CameraSides) {
        this.camera.selected = this.camera.sides.filter((i) =>
          data.CameraSides?.includes(i.Id)
        );
      }
    },
  };
}
