import { Component, Input } from '@angular/core';
import { RoadObjectGeometryType } from '../../../../../../common/data-core/enums/road/road-object/road-object-geometry-type.enum';
import { SystemEventRoadObjectManagerComponent } from '../../system-event-road-object/system-event-road-object-manager/system-event-road-object-manager.component';
import { SystemEventRoadObjectTableArgs } from '../../system-event-road-object/system-event-road-object-table/system-event-road-object-table.model';

@Component({
  selector: 'ias-system-event-road-line-manager',
  imports: [SystemEventRoadObjectManagerComponent],
  templateUrl: './system-event-road-line-manager.component.html',
  styleUrl: './system-event-road-line-manager.component.less',
})
export class SystemEventRoadLineManagerComponent {
  @Input() args?: SystemEventRoadObjectTableArgs;
  @Input() mapable = true;
  @Input() iswindow = false;
  type = RoadObjectGeometryType.line;
}
