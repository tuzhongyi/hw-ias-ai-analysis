import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnalysisTask } from '../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { ShopTaskStatistic } from '../../../../../../common/data-core/models/arm/analysis/task/shop-task-statistic.model';
import { SystemTaskRouteStatisticRegistrationBusiness } from './business/system-task-route-statistic-registration.business';
import { SystemTaskRouteStatisticTaskBusiness } from './business/system-task-route-statistic-task.business';
import { SystemTaskRouteStatisticBusiness } from './business/system-task-route-statistic.business';
import { ShopStatisticStatus } from './system-task-route-statistic.model';

@Component({
  selector: 'ias-system-task-route-statistic',
  imports: [CommonModule],
  templateUrl: './system-task-route-statistic.component.html',
  styleUrl: './system-task-route-statistic.component.less',
  providers: [
    SystemTaskRouteStatisticBusiness,
    SystemTaskRouteStatisticTaskBusiness,
    SystemTaskRouteStatisticRegistrationBusiness,
  ],
})
export class SystemTaskRouteStatisticComponent implements OnInit {
  @Input('data') task?: AnalysisTask;
  @Output('registration') out_registration = new EventEmitter<
    boolean | undefined
  >();
  @Output('analysis') out_analysis = new EventEmitter<
    ShopStatisticStatus | undefined
  >();

  constructor(private business: SystemTaskRouteStatisticBusiness) {}

  Status = ShopStatisticStatus;
  statistic?: ShopTaskStatistic;
  registration = {
    count: 0,
    associated: 0,
  };

  ngOnInit(): void {
    if (this.task) {
      this.load(this.task);
    }
  }

  private load(data: AnalysisTask) {
    this.business.task.load(data.Id).then((x) => {
      this.statistic = x;
    });
    this.business.registration.count().then((x) => {
      this.registration.count = x;
    });
    this.business.registration.associated().then((x) => {
      this.registration.associated = x;
    });
  }

  on = {
    analysis: (type?: ShopStatisticStatus) => {
      this.out_analysis.emit(type);
    },
    registration: (associated?: boolean) => {
      this.out_registration.emit(associated);
    },
  };
}
