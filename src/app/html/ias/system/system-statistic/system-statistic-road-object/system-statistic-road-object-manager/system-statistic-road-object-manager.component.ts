import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RoadObjectEventRecord } from '../../../../../../common/data-core/models/arm/geographic/road-object-event-record.model';
import { SystemStatisticRoadObjectMapComponent } from '../system-statistic-road-object-map/system-statistic-road-object-map.component';
import { SystemStatisticRoadObjectTimelineComponent } from '../system-statistic-road-object-timeline/system-statistic-road-object-timeline.component';
import { SystemStatisticRoadObjectManagerBusiness } from './system-statistic-road-object-manager.business';
import { SystemStatisticRoadObjectArgs } from './system-statistic-road-object-manager.model';

@Component({
  selector: 'ias-system-statistic-road-object-manager',
  imports: [
    CommonModule,
    SystemStatisticRoadObjectMapComponent,
    SystemStatisticRoadObjectTimelineComponent,
  ],
  templateUrl: './system-statistic-road-object-manager.component.html',
  styleUrl: './system-statistic-road-object-manager.component.less',
  providers: [SystemStatisticRoadObjectManagerBusiness],
})
export class SystemStatisticRoadObjectManagerComponent implements OnInit {
  constructor(private business: SystemStatisticRoadObjectManagerBusiness) {}

  datas: RoadObjectEventRecord[] = [];
  args = new SystemStatisticRoadObjectArgs();

  ngOnInit(): void {
    this.load();
  }

  private load() {
    this.business.load(this.args).then((x) => {
      this.datas = x;
    });
  }
}
