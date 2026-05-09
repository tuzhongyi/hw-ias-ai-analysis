import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { wait } from '../../../../../../common/tools/wait';
import { SystemStatisticRoadObjectStatement5ItemComponent } from '../system-statistic-road-object-statement-5-item/system-statistic-road-object-statement-5-item.component';
import { SystemStatisticRoadObjectStatementContainerComponent } from '../system-statistic-road-object-statement-container/system-statistic-road-object-statement-container.component';
import { SystemStatisticRoadObjectStatementConverter } from '../system-statistic-road-object-statement.converter';
import { RoadObjectStatementModel } from '../system-statistic-road-object-statement.model';
import { SystemStatisticRoadObjectStatementSource } from '../system-statistic-road-object-statement.source';

@Component({
  selector: 'ias-system-statistic-road-object-statement-5',
  imports: [
    CommonModule,
    FormsModule,
    SystemStatisticRoadObjectStatementContainerComponent,
    SystemStatisticRoadObjectStatement5ItemComponent,
  ],
  templateUrl: './system-statistic-road-object-statement-5.component.html',
  styleUrl: './system-statistic-road-object-statement-5.component.less',
  providers: [SystemStatisticRoadObjectStatementSource],
})
export class SystemStatisticRoadObjectStatement5Component implements OnChanges {
  @Input() statement?: Promise<RoadObjectStatement>;

  constructor(private source: SystemStatisticRoadObjectStatementSource) {}

  total = 0;
  datas: RoadObjectStatementModel[] = [];
  Language = Language;
  converter = new SystemStatisticRoadObjectStatementConverter();

  ngOnChanges(changes: SimpleChanges): void {
    wait(() => {
      return this.source.object.states.length > 0;
    }).then((x) => {
      if (this.statement) {
        this.statement.then((x) => this.load(x));
      }
    });
  }

  private async load(source: RoadObjectStatement) {
    let states = this.source.object.states.filter((x) => x.Value != 0);
    this.total = 0;
    source.ObjectStateNumbers.forEach((x) => {
      if (x.Value == 0) return;
      this.total += x.Number;
    });
    this.datas = states.map((state) => {
      return this.converter.object.state(source, state, this.total);
    });
  }
}
