import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemStatisticRoadObjectStatement3ItemComponent } from '../system-statistic-road-object-statement-3-item/system-statistic-road-object-statement-3-item.component';
import { SystemStatisticRoadObjectStatementContainerComponent } from '../system-statistic-road-object-statement-container/system-statistic-road-object-statement-container.component';
import { SystemStatisticRoadObjectStatementSource } from '../system-statistic-road-object-statement.source';

@Component({
  selector: 'ias-system-statistic-road-object-statement-3',
  imports: [
    CommonModule,
    FormsModule,
    SystemStatisticRoadObjectStatementContainerComponent,
    SystemStatisticRoadObjectStatement3ItemComponent,
  ],
  templateUrl: './system-statistic-road-object-statement-3.component.html',
  styleUrl: './system-statistic-road-object-statement-3.component.less',
  providers: [SystemStatisticRoadObjectStatementSource],
})
export class SystemStatisticRoadObjectStatement3Component {
  @Input() statement?: RoadObjectStatement;

  Language = Language;

  constructor(public source: SystemStatisticRoadObjectStatementSource) {}
}
