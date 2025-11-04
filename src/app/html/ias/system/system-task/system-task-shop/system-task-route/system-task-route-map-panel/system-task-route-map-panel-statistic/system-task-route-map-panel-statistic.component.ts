import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnalysisTask } from '../../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { ShopTaskStatistic } from '../../../../../../../../common/data-core/models/arm/analysis/task/shop-task-statistic.model';
import { SystemMapStatisticComponent } from '../../../../../system-map/system-map-statistic/system-map-statistic.component';
import { SystemTaskRouteStatisticRegistrationBusiness } from '../../system-task-route-statistic/business/system-task-route-statistic-registration.business';
import { SystemTaskRouteStatisticTaskBusiness } from '../../system-task-route-statistic/business/system-task-route-statistic-task.business';
import { SystemTaskRouteStatisticBusiness } from '../../system-task-route-statistic/business/system-task-route-statistic.business';
import { ShopStatisticStatus } from '../../system-task-route-statistic/system-task-route-statistic.model';

@Component({
  selector: 'ias-system-task-route-map-panel-statistic',
  imports: [CommonModule, SystemMapStatisticComponent],
  templateUrl: './system-task-route-map-panel-statistic.component.html',
  styleUrl: './system-task-route-map-panel-statistic.component.less',
  providers: [
    SystemTaskRouteStatisticBusiness,
    SystemTaskRouteStatisticTaskBusiness,
    SystemTaskRouteStatisticRegistrationBusiness,
  ],
})
export class SystemTaskRouteMapPanelStatisticComponent implements OnInit {
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

  ngOnInit(): void {
    if (this.task) {
      this.load(this.task);
    }
  }

  private load(data: AnalysisTask) {
    this.business.task.load(data.Id).then((x) => {
      this.statistic = x;
    });
  }

  on = {
    analysis: (type?: ShopStatisticStatus) => {
      this.out_analysis.emit(type);
    },
    registration: (detected?: boolean) => {
      this.out_registration.emit(detected);
    },
  };
}
