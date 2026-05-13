import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { EnumNameValue } from '../../../../../../common/data-core/models/capabilities/enum-name-value.model';
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
  @Input() statement?: RoadObjectStatement;

  constructor(private source: SystemStatisticRoadObjectStatementSource) {}

  Language = Language;
  datas: RoadObjectStatementModel[] = [];
  converter = new SystemStatisticRoadObjectStatementConverter();

  ngOnInit(): void {
    wait(() => {
      return this.source.object.states.length > 0;
    }).then((x) => {
      if (this.statement) {
        this.load(this.statement, this.source.object.states);
      }
    });
  }

  private async load(
    data: RoadObjectStatement,
    states: EnumNameValue<number>[]
  ) {
    this.datas = states.map((state) => {
      return this.converter.object.state(data, state);
    });
  }
}
