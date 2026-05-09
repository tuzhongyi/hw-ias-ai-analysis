import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoadObjectStatement } from '../../../../../../common/data-core/models/arm/geographic/road-object-statement.model';
import { FontFitDirective } from '../../../../../../common/directives/scale/scale-font-fit.directive';
import { Language } from '../../../../../../common/tools/language-tool/language';
import { SystemStatisticRoadObjectStatementContainerComponent } from '../system-statistic-road-object-statement-container/system-statistic-road-object-statement-container.component';

@Component({
  selector: 'ias-system-statistic-road-object-statement-9',
  imports: [
    CommonModule,
    FormsModule,
    FontFitDirective,
    SystemStatisticRoadObjectStatementContainerComponent,
  ],
  templateUrl: './system-statistic-road-object-statement-9.component.html',
  styleUrl: './system-statistic-road-object-statement-9.component.less',
})
export class SystemStatisticRoadObjectStatement9Component implements OnInit {
  @Input() statement?: Promise<RoadObjectStatement>;

  comments: string[] = [];
  ngOnInit(): void {
    if (this.statement) {
      this.statement.then((x) => this.load(x));
    }
  }
  private load(data: RoadObjectStatement) {
    if (data.Comments) {
      this.comments = data.Comments;
    }
  }

  Language = Language;
}
