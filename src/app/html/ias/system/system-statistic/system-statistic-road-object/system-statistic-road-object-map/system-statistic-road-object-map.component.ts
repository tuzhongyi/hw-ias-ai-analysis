import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { SystemStatisticRoadObjectMapController } from './controller/system-statistic-road-object-map.controller';
import { SystemStatisticRoadObjectMapBusiness } from './system-statistic-road-object-map.business';

@Component({
  selector: 'ias-system-statistic-road-object-map',
  imports: [CommonModule],
  templateUrl: './system-statistic-road-object-map.component.html',
  styleUrl: './system-statistic-road-object-map.component.less',
  providers: [SystemStatisticRoadObjectMapBusiness],
})
export class SystemStatisticRoadObjectMapComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input('datas') records: RoadObjectEventRecord[] = [];

  constructor(private business: SystemStatisticRoadObjectMapBusiness) {}

  private subscription = new Subscription();
  private controller = new SystemStatisticRoadObjectMapController();

  private load = {
    road: async () => {
      let datas = await this.business.road();
      let polylines = await this.controller.road.load(datas);
      let center = await this.controller.map.focus(polylines);
    },
    records: async () => {},
  };

  ngOnInit(): void {
    this.load.road();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.controller.map.destroy();
  }
  ngOnChanges(changes: SimpleChanges): void {}
}
