import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { wait } from '../../../../../../common/tools/wait';
import { SystemStatisticRoadObjectStatement4ChartComponent } from '../system-statistic-road-object-statement-4-chart/system-statistic-road-object-statement-4-chart.component';
import { SystemStatisticRoadObjectStatementContainerComponent } from '../system-statistic-road-object-statement-container/system-statistic-road-object-statement-container.component';
import { SystemStatisticRoadObjectStatementConverter } from '../system-statistic-road-object-statement.converter';
import { RoadObjectStatementModel } from '../system-statistic-road-object-statement.model';
import { SystemStatisticRoadObjectStatementSource } from '../system-statistic-road-object-statement.source';

@Component({
  selector: 'ias-system-statistic-road-object-statement-4',
  imports: [
    CommonModule,
    FormsModule,
    SystemStatisticRoadObjectStatementContainerComponent,
    SystemStatisticRoadObjectStatement4ChartComponent,
  ],
  templateUrl: './system-statistic-road-object-statement-4.component.html',
  styleUrl: './system-statistic-road-object-statement-4.component.less',
  providers: [SystemStatisticRoadObjectStatementSource],
})
export class SystemStatisticRoadObjectStatement4Component implements OnInit {
  @Input() statement?: Promise<RoadObjectStatement>;

  constructor(private source: SystemStatisticRoadObjectStatementSource) {}

  Language = Language;
  datas: RoadObjectStatementModel[] = [];
  converter = new SystemStatisticRoadObjectStatementConverter();

  ngOnInit(): void {
    wait(() => {
      return this.source.object.states.length > 0;
    }).then((x) => {
      if (this.statement) {
        this.statement.then((x) => this.load(x));
      }
    });
  }

  private async load(data: RoadObjectStatement) {
    this.datas = this.source.object.states.map((state) => {
      return this.converter.object.state(data, state);
    });
  }
}
