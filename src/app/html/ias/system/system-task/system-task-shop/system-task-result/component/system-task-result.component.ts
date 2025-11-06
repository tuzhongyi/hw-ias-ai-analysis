import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { LabelResultStatistic } from '../../../../../../../common/data-core/models/arm/analysis/label-result-statistic.model';
import { ShopSign } from '../../../../../../../common/data-core/models/arm/analysis/shop-sign.model';
import { AnalysisTask } from '../../../../../../../common/data-core/models/arm/analysis/task/analysis-task.model';
import { NameValue } from '../../../../../../../common/data-core/models/capabilities/enum-name-value.model';
import {
  Page,
  PagedList,
} from '../../../../../../../common/data-core/models/page-list.model';
import { Language } from '../../../../../../../common/tools/language-tool/language';
import { InputSelectRoadComponent } from '../../../../../share/input-select-road/input-select-road.component';
import { PicturePolygonArgs } from '../../../../../share/picture/picture-polygon/picture-polygon.model';
import { SystemTaskResultInfoComponent } from '../system-task-result-info/system-task-result-info.component';
import { SystemTaskResultMapComponent } from '../system-task-result-map/system-task-result-map.component';
import { SystemTaskResultTableManagerComponent } from '../system-task-result-table-manager/system-task-result-table-manager.component';
import {
  SystemTaskResultTableArgs,
  SystemTaskResultTableType,
} from '../system-task-result-table-manager/system-task-result-table-manager.model';
import { SystemTaskResultBusiness } from './system-task-result.business';

@Component({
  selector: 'ias-system-task-result',
  imports: [
    CommonModule,
    FormsModule,
    SystemTaskResultTableManagerComponent,
    SystemTaskResultInfoComponent,
    SystemTaskResultMapComponent,
    InputSelectRoadComponent,
  ],
  templateUrl: './system-task-result.component.html',
  styleUrl: './system-task-result.component.less',
  providers: [SystemTaskResultBusiness],
})
export class SystemTaskResultComponent implements OnInit {
  @Input() data?: AnalysisTask;
  @Output() picture = new EventEmitter<
    PagedList<NameValue<PicturePolygonArgs>>
  >();

  constructor(
    private toastr: ToastrService,
    private business: SystemTaskResultBusiness
  ) {}

  indexchange = new EventEmitter<number>();
  selected?: ShopSign;
  page?: Page;
  signs: ShopSign[] = [];
  loading = true;
  statistic?: LabelResultStatistic;
  Language = Language;

  table = {
    type: SystemTaskResultTableType.shop,
    args: new SystemTaskResultTableArgs(),
    load: {
      event: new EventEmitter<SystemTaskResultTableArgs>(),
      on: () => {
        this.table.load.event.emit(this.table.args);
      },
    },
  };

  ngOnInit(): void {
    this.onlabeling();
  }

  onget(index: number) {
    this.indexchange.emit(index);
  }
  onpage(page: Page) {
    this.page = page;
  }
  onpageprov() {
    if (this.page) {
      this.page.PageIndex--;
    }
  }
  onpagenext() {
    if (this.page) {
      this.page.PageIndex++;
    }
  }
  onloaded(signs: ShopSign[]) {
    this.signs = signs;
    this.loading = false;
  }
  onerror(error: Error) {
    this.toastr.error(error.message);
    this.loading = false;
  }
  async onpicture(data: ShopSign) {
    let title = '';
    if (this.table.type == 1) {
      title = data.Text ?? '';
    } else {
      if (data.ShopId) {
        let shop = await this.business.shop(data.ShopId);
        title = shop.Name;
      } else {
        title = data.Text ?? '';
      }
    }
    let args = new PicturePolygonArgs();
    args.id = data.ImageUrl;
    args.polygon = data.Polygon ?? [];

    let value = new NameValue(args, title);
    let paged = PagedList.create([value], 1, 1);
    this.picture.emit(paged);
  }
  onlabeling() {
    if (this.data) {
      this.business.statistic(this.data.Id).then((x) => {
        this.statistic = x;
      });
    }
  }
}
