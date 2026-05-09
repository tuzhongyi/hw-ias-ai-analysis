import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemStatisticRoadObjectStatementContainerComponent } from '../system-statistic-road-object-statement-container/system-statistic-road-object-statement-container.component';

@Component({
  selector: 'ias-system-statistic-road-object-statement-1',
  imports: [
    CommonModule,
    FormsModule,
    SystemStatisticRoadObjectStatementContainerComponent,
  ],
  templateUrl: './system-statistic-road-object-statement-1.component.html',
  styleUrl: './system-statistic-road-object-statement-1.component.less',
})
export class SystemStatisticRoadObjectStatement1Component {
  @Input() statement?: Promise<RoadObjectStatement>;

  Language = Language;
}
