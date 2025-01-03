import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input } from '@angular/core';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { SystemTaskResultInfoComponent } from '../system-task-result-info/system-task-result-info.component';
import { SystemTaskResultMapComponent } from '../system-task-result-map/system-task-result-map.component';
import { SystemTaskResultTableComponent } from '../system-task-result-table/system-task-result-table.component';

@Component({
  selector: 'ias-system-task-result',
  imports: [
    CommonModule,
    ContentHeaderComponent,
    SystemTaskResultTableComponent,
    SystemTaskResultInfoComponent,
    SystemTaskResultMapComponent,
  ],
  templateUrl: './system-task-result.component.html',
  styleUrl: './system-task-result.component.less',
})
export class SystemTaskResultComponent {
  @Input() data?: AnalysisTask;

  indexchange = new EventEmitter<number>();
  selected?: ShopSign;
  page?: Page;
  signs: ShopSign[] = [];

  onget(index: number) {
    this.indexchange.emit(index);
  }
  onpage(page: Page) {
    this.page = page;
  }
  onloaded(signs: ShopSign[]) {
    this.signs = signs;
  }
}
