import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { LanguageTool } from '../../../../common/tools/language.tool';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { PictureWindowContentComponent } from '../../share/picture-window-content/picture-window-content.component';
import { SystemTaskResultInfoComponent } from '../system-task-result-info/system-task-result-info.component';
import { SystemTaskResultMapComponent } from '../system-task-result-map/system-task-result-map.component';
import { SystemTaskResultTableComponent } from '../system-task-result-table/system-task-result-table.component';
import { SystemTaskResultWindow } from './system-task-result.window';

@Component({
  selector: 'ias-system-task-result',
  imports: [
    CommonModule,
    ContentHeaderComponent,
    WindowComponent,
    PictureWindowContentComponent,
    SystemTaskResultTableComponent,
    SystemTaskResultInfoComponent,
    SystemTaskResultMapComponent,
  ],
  templateUrl: './system-task-result.component.html',
  styleUrl: './system-task-result.component.less',
})
export class SystemTaskResultComponent implements OnInit {
  @Input() data?: AnalysisTask;

  constructor(private language: LanguageTool, private toastr: ToastrService) {}

  indexchange = new EventEmitter<number>();
  selected?: ShopSign;
  page?: Page;
  signs: ShopSign[] = [];
  type = '';
  loading = true;
  window = new SystemTaskResultWindow();

  ngOnInit(): void {
    if (this.data) {
      this.language.TaskType(this.data.TaskType).then((x) => {
        this.type = x;
      });
    }
  }

  onget(index: number) {
    this.indexchange.emit(index);
  }
  onpage(page: Page) {
    this.page = page;
  }
  onloaded(signs: ShopSign[]) {
    this.signs = signs;
    this.loading = false;
  }
  onerror(error: Error) {
    this.toastr.error(error.message);
    this.loading = false;
  }
  onpicture(data: ShopSign) {
    this.window.picture.title = data.Text ?? '';
    this.window.picture.id = data.ImageUrl;
    this.window.picture.polygon = data.Polygon ?? [];
    this.window.picture.show = true;
  }
}
