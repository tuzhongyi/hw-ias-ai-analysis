import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WindowComponent } from '../../../../common/components/window-control/window.component';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { LabelResultStatistic } from '../../../../common/data-core/models/arm/analysis/label-result-statistic.model';
import { ShopSign } from '../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { Page } from '../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../common/tools/language';
import { LanguageTool } from '../../../../common/tools/language.tool';
import { ContentHeaderComponent } from '../../share/header/content-header/content-header.component';
import { PictureWindowContentComponent } from '../../share/picture-window-content/picture-window-content.component';
import { SystemTaskResultInfoComponent } from '../system-task-result-info/system-task-result-info.component';
import { SystemTaskResultMapComponent } from '../system-task-result-map/system-task-result-map.component';
import { SystemTaskResultTableManagerComponent } from '../system-task-result-table-manager/system-task-result-table-manager.component';
import { SystemTaskResultTableType } from '../system-task-result-table-manager/system-task-result-table-manager.model';
import { SystemTaskResultBusiness } from './system-task-result.business';
import { SystemTaskResultWindow } from './system-task-result.window';

@Component({
  selector: 'ias-system-task-result',
  imports: [
    CommonModule,
    FormsModule,
    ContentHeaderComponent,
    WindowComponent,
    PictureWindowContentComponent,
    SystemTaskResultTableManagerComponent,
    SystemTaskResultInfoComponent,
    SystemTaskResultMapComponent,
  ],
  templateUrl: './system-task-result.component.html',
  styleUrl: './system-task-result.component.less',
  providers: [SystemTaskResultBusiness],
})
export class SystemTaskResultComponent implements OnInit {
  @Input() data?: AnalysisTask;

  constructor(
    private language: LanguageTool,
    private toastr: ToastrService,
    private business: SystemTaskResultBusiness
  ) {}

  task = {
    name: '',
    type: '',
  };

  indexchange = new EventEmitter<number>();
  selected?: ShopSign;
  page?: Page;
  signs: ShopSign[] = [];
  loading = true;
  window = new SystemTaskResultWindow();
  statistic?: LabelResultStatistic;
  Language = Language;

  table = {
    args: {
      mode: SystemTaskResultTableType.shop,
      name: '',
    },
    load: {
      event: new EventEmitter<string>(),
      on: () => {
        this.table.load.event.emit(this.table.args.name);
      },
    },
  };

  ngOnInit(): void {
    if (this.data) {
      this.task.name = this.data.Name ?? '';
      this.language.TaskType(this.data.TaskType).then((x) => {
        this.task.type = x;
      });
    }
    this.onlabeling();
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
  onlabeling() {
    if (this.data) {
      this.business.statistic(this.data.Id).then((x) => {
        this.statistic = x;
      });
    }
  }
}
