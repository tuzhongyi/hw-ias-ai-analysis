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
import { RoadPoint } from '../../../../../../common/data-core/models/arm/geographic/road-point.model';
import { GlobalStorage } from '../../../../../../common/storage/global.storage';
import { SystemModuleRoadPointMapController } from './controller/system-module-road-point-map.controller';
import { SystemModuleRoadPointMapBusiness } from './system-module-road-point-map.business';

@Component({
  selector: 'ias-system-module-road-point-map',
  imports: [CommonModule],
  templateUrl: './system-module-road-point-map.component.html',
  styleUrl: './system-module-road-point-map.component.less',
  providers: [SystemModuleRoadPointMapBusiness],
})
export class SystemModuleRoadPointMapComponent
  implements OnChanges, OnInit, OnDestroy
{
  @Input() datas: RoadPoint[] = [];
  @Input() selected?: RoadPoint;

  constructor(
    private business: SystemModuleRoadPointMapBusiness,
    private global: GlobalStorage
  ) {}

  private subscription = new Subscription();
  private controller = new SystemModuleRoadPointMapController(
    this.subscription
  );

  private load = {
    road: async () => {
      try {
        let datas = await this.business.road();
        let polylines = await this.controller.road.load(datas);
        let center = await this.controller.map.focus(polylines);
      } catch (e) {
        let user = await this.global.user.get();
        this.controller.map.city(user.GroupName);
      }
    },
  };

  private change = {
    datas: (change: SimpleChange) => {
      if (change) {
        this.controller.scatter.clear().then(() => {
          if (this.datas.length > 0) {
            this.controller.scatter.load(this.datas);
          }
        });
      }
    },
    selected: (change: SimpleChange) => {
      if (change && !change.firstChange) {
        if (this.selected) {
          this.controller.scatter.select(this.selected);
        } else {
          this.controller.scatter.blur();
        }
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.change.datas(changes['datas']);
    this.change.selected(changes['selected']);
  }
  ngOnInit(): void {
    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
}
