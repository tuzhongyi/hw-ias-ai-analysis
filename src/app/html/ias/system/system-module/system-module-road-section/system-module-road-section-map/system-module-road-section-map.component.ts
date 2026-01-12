import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadSection } from '../../../../../../common/data-core/models/arm/geographic/road-section.model';
import { SystemModuleRoadSectionMapAMapController } from './controller/amap/system-module-road-section-map-amap.controller';
import { SystemModuleRoadSectionMapPositionController } from './controller/system-module-road-section-map-position.controller';
import { SystemModuleRoadSectionMapController } from './controller/system-module-road-section-map.controller';
import { SystemModuleRoadSectionMapBusiness } from './system-module-road-section-map.business';

@Component({
  selector: 'ias-system-module-road-section-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-section-map.component.html',
  styleUrl: './system-module-road-section-map.component.less',
  providers: [
    SystemModuleRoadSectionMapController,
    SystemModuleRoadSectionMapAMapController,
    SystemModuleRoadSectionMapPositionController,
    SystemModuleRoadSectionMapBusiness,
  ],
})
export class SystemModuleRoadSectionMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() datas: RoadSection[] = [];
  @Input() selected?: RoadSection;

  constructor(
    public controller: SystemModuleRoadSectionMapController,
    private business: SystemModuleRoadSectionMapBusiness
  ) {}

  private subscription = new Subscription();
  private load = {
    road: () => {
      this.business.road().then((datas) => {
        this.controller.road.load(datas);
      });
    },
  };
  ngOnInit(): void {
    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.selected(changes['selected']);
  }

  change = {
    datas: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        this.controller.amap.load(this.datas);
      }
    },
    selected: (data: SimpleChange) => {
      if (data && !data.firstChange) {
        if (this.selected) {
          this.controller.amap.select(this.selected.Id);
        } else {
          this.controller.amap.blur();
          this.controller.amap.focus();
        }
      }
    },
  };
}
