import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import {
  Page,
  Paged,
} from '../../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';

import { AnalysisGpsTask } from '../../../../../../common/data-core/models/arm/analysis/llm/analysis-gps-task.model';

import { PictureBusiness } from '../../../../share/picture/component/picture.business';
import { SystemModuleGpsTaskTableBusiness } from './system-module-gps-task-table.business';
import {
  SystemModuleGpsTaskTableArgs,
  SystemModuleGpsTaskTableFilter,
  SystemModuleGpsTaskTableItem,
} from './system-module-gps-task-table.model';

@Component({
  selector: 'ias-system-module-gps-task-table',
  imports: [DatePipe, CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-module-gps-task-table.component.html',
  styleUrl: './system-module-gps-task-table.component.less',
  providers: [SystemModuleGpsTaskTableBusiness, PictureBusiness],
})
export class SystemModuleGpsTaskTableComponent implements OnInit, OnDestroy {
  @Input() args?: SystemModuleGpsTaskTableArgs;
  @Input('load') _load?: EventEmitter<SystemModuleGpsTaskTableArgs>;
  @Output() loaded = new EventEmitter<AnalysisGpsTask[]>();
  @Input() selecteds: AnalysisGpsTask[] = [];
  @Output() selectedsChange = new EventEmitter<AnalysisGpsTask[]>();
  @Output() details = new EventEmitter<AnalysisGpsTask>();
  @Output('picture') image = new EventEmitter<Paged<AnalysisGpsTask>>();

  constructor(private business: SystemModuleGpsTaskTableBusiness) {}

  filter = new SystemModuleGpsTaskTableFilter();
  datas: Array<SystemModuleGpsTaskTableItem | undefined> = [];
  page = Page.create(1, 10);
  widths = [
    '100px',
    '100px',
    '150px',
    '200px',
    '150px',
    '150px',
    'auto',
    '200px',
    '100px',
  ];
  subscription = new Subscription();
  Color = ColorTool;

  ngOnInit(): void {
    this.regist();
    if (this.args) {
      this.filter = Object.assign(this.filter, this.args);
    }
    this.load(this.page.PageIndex, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  private regist() {
    if (this._load) {
      let sub = this._load.subscribe((args) => {
        this.filter = Object.assign(this.filter, args);
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
      });
      this.subscription.add(sub);
    }
  }
  private load(
    index: number,
    size: number,
    filter: SystemModuleGpsTaskTableFilter
  ) {
    this.business.load(index, size, filter).then((x) => {
      this.page = x.Page;

      this.datas = x.Data;
      this.loaded.emit(x.Data);
      while (this.datas.length < this.page.PageSize) {
        this.datas.push(undefined);
      }
    });
  }

  picture = {
    get: (key: string) => {
      return this.business.picture.load(key);
    },
    on: (e: Event, index: number, item?: AnalysisGpsTask) => {
      let i = this.selecteds.findIndex((x) => x.Id === item?.Id);
      if (i >= 0) {
        e.stopImmediatePropagation();
      }

      if (item) {
        let paged = new Paged<AnalysisGpsTask>();
        paged.Data = item;
        paged.Page = new Page();
        paged.Page.PageCount = this.page.TotalRecordCount;
        paged.Page.PageIndex =
          this.page.PageSize * (this.page.PageIndex - 1) + index + 1;
        paged.Page.PageSize = 1;
        paged.Page.RecordCount = 1;
        paged.Page.TotalRecordCount = this.page.TotalRecordCount;
        this.image.emit(paged);
      }
    },
  };

  on = {
    sort: (sort: Sort) => {
      if (sort.direction === 'asc') {
        this.filter.asc = sort.active;
      } else {
        this.filter.desc = sort.active;
      }
      this.load(this.page.PageIndex, this.page.PageSize, this.filter);
    },
    page: (index: number) => {
      if (this.filter) {
        this.load(index, this.page.PageSize, this.filter);
        this.selecteds = [];
        this.selectedsChange.emit(this.selecteds);
      }
    },
    details: (item: AnalysisGpsTask, e: Event) => {
      this.details.emit(item);
      e.stopImmediatePropagation();
    },
  };

  select = {
    on: (item?: AnalysisGpsTask) => {
      if (!item) return;
      let index = this.selecteds.findIndex((x) => x.Id === item.Id);
      if (index < 0) {
        this.selecteds.push(item);
      } else {
        this.selecteds.splice(index, 1);
      }
      this.selectedsChange.emit(this.selecteds);
    },
    all: () => {
      if (this.selecteds.length === this.page.RecordCount) {
        this.selecteds = [];
      } else {
        this.selecteds = [];
        for (let i = 0; i < this.datas.length; i++) {
          const data = this.datas[i];
          if (data) {
            this.selecteds.push(data);
          }
        }
      }
      this.selectedsChange.emit(this.selecteds);
    },
    clear: () => {
      this.selecteds = [];
      this.selectedsChange.emit(this.selecteds);
    },
  };
}
