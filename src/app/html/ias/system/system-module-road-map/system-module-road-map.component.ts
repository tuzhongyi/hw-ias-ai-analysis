import { Component } from '@angular/core';
import { SystemModuleRoadMapAMapController } from './controller/amap/system-module-road-map-amap.controller';
import { SystemModuleRoadMapController } from './controller/system-module-road-map.controller';

@Component({
  selector: 'ias-system-module-road-map',
  imports: [],
  templateUrl: './system-module-road-map.component.html',
  styleUrl: './system-module-road-map.component.less',
  providers: [SystemModuleRoadMapController, SystemModuleRoadMapAMapController],
})
export class SystemModuleRoadMapComponent {
  constructor(private controller: SystemModuleRoadMapController) {}
}
