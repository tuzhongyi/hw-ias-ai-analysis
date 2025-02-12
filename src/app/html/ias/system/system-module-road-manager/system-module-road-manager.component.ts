import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Road } from '../../../../common/data-core/models/arm/analysis/road.model';
import { SystemModuleRoadMapComponent } from '../system-module-road-map/system-module-road-map.component';
import { SystemModuleRoadTableComponent } from '../system-module-road-table/system-module-road-table.component';
import { SystemModuleRoadTableArgs } from '../system-module-road-table/system-module-road-table.model';

@Component({
  selector: 'ias-system-module-road-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemModuleRoadTableComponent,
    SystemModuleRoadMapComponent,
  ],
  templateUrl: './system-module-road-manager.component.html',
  styleUrl: './system-module-road-manager.component.less',
})
export class SystemModuleRoadManagerComponent {
  args = new SystemModuleRoadTableArgs();

  create = {
    open: () => {},
    ok: (data: Road) => {},
  };
}
