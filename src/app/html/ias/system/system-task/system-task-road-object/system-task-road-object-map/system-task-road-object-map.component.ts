import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObject } from '../../../../../../common/data-core/models/arm/geographic/road-object.model';
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { ComponentTool } from '../../../../../../common/tools/component-tool/component.tool';
import { SystemTaskRoadObjectMapController } from './controller/system-task-road-object-map.controller';

@Component({
  selector: 'ias-system-task-road-object-map',
  imports: [CommonModule],
  templateUrl: './system-task-road-object-map.component.html',
  styleUrl: './system-task-road-object-map.component.less',
  providers: [ComponentTool],
})
export class SystemTaskRoadObjectMapComponent {
  @Input() objects: RoadObject[] = [];
  @Input() object_selected?: RoadObject;
  @Output() object_selectedChange = new EventEmitter<RoadObject>();

  @Input() sections: RoadSection[] = [];
  @Input() section_selected?: RoadSection;
  @Output() section_selectedChange = new EventEmitter<RoadSection>();

  @Input() points: RoadPoint[] = [];
  @Input() point_selected?: RoadPoint;
  @Output() point_selectedChange = new EventEmitter<RoadPoint>();

  constructor(tool: ComponentTool) {
    this.controller = new SystemTaskRoadObjectMapController(
      tool,
      this.subscription
    );
  }

  private subscription = new Subscription();
  private controller: SystemTaskRoadObjectMapController;
}
