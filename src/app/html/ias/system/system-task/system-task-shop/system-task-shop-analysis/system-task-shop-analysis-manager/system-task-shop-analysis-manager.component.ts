import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { Road } from '../../../../../../../common/data-core/models/arm/geographic/road.model';
import { EnumTool } from '../../../../../../../common/tools/enum-tool/enum.tool';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { ShopStatisticStatus } from '../../../system-task-route/system-task-route-statistic/system-task-route-statistic.model';
import { SystemTaskShopAnalysisDetailsComponent } from '../system-task-shop-analysis-details/system-task-shop-analysis-details.component';
import { SystemTaskShopAnalysisTableComponent } from '../system-task-shop-analysis-table/system-task-shop-analysis-table.component';
import {
  ISystemTaskShopAnalysisTableItem,
  SystemTaskShopAnalysisTableArgs,
} from '../system-task-shop-analysis-table/system-task-shop-analysis-table.model';
import { SystemTaskShopAnalysisManagerBusiness } from './system-task-shop-analysis-manager.business';

@Component({
  selector: 'ias-system-task-shop-analysis-manager',
  imports: [
    CommonModule,
    FormsModule,
    SystemTaskShopAnalysisTableComponent,
    SystemTaskShopAnalysisDetailsComponent,
  ],
  templateUrl: './system-task-shop-analysis-manager.component.html',
  styleUrl: './system-task-shop-analysis-manager.component.less',
  providers: [SystemTaskShopAnalysisManagerBusiness],
})
export class SystemTaskShopAnalysisManagerComponent implements OnInit {
  @Input() data?: AnalysisTask;
  @Input() status?: ShopStatisticStatus;
  constructor(private business: SystemTaskShopAnalysisManagerBusiness) {}
  Language = Language;
  table = {
    args: new SystemTaskShopAnalysisTableArgs(),
    load: new EventEmitter<SystemTaskShopAnalysisTableArgs>(),
    selected: undefined as ISystemTaskShopAnalysisTableItem | undefined,
  };
  source = {
    road: [] as Road[],
    status: [] as ShopStatisticStatus[],
  };

  ngOnInit(): void {
    if (this.data) {
      this.table.args.taskId = this.data.Id;
    }
    this.table.args.status = this.status;
    this.init();
  }

  init() {
    this.source.status = EnumTool.values(ShopStatisticStatus);
    this.business.load().then((x) => {
      this.source.road = x;
    });
  }

  on = {
    search: () => {
      this.table.load.emit(this.table.args);
    },
  };
}
