import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PaginatorComponent } from '../../../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language';

import { Subscription } from 'rxjs';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import {
  AnalysisTaskModel,
  SystemTaskTableFilter,
} from '../system-task-table.model';
import { SystemTaskTableFinishedBusiness } from './system-task-table-finished.business';
import { SystemTaskTableFinishedConverter } from './system-task-table-finished.converter';
import { AnalysisTaskFinishModel } from './system-task-table-finished.model';

@Component({
  selector: 'ias-system-task-table-finished',
  imports: [TableSorterDirective, DatePipe, CommonModule, PaginatorComponent],
  templateUrl: './system-task-table-finished.component.html',
  styleUrl: './system-task-table-finished.component.less',
  providers: [
    SystemTaskTableFinishedBusiness,
    SystemTaskTableFinishedConverter,
  ],
})
export class SystemTaskTableFinishedComponent implements OnInit, OnDestroy {
  @Input() filter = new SystemTaskTableFilter();
  @Input('load') _load?: EventEmitter<SystemTaskTableFilter>;

  @Output() result = new EventEmitter<AnalysisTaskModel>();
  @Output() files = new EventEmitter<AnalysisTaskModel>();
  @Output() error = new EventEmitter<Error>();

  constructor(private business: SystemTaskTableFinishedBusiness) {}

  widths = [
    '100px',
    'auto',
    '8%',
    '8%',
    '200px',
    '200px',
    '200px',
    '200px',
    '100px',
    '100px',
  ];
  page = Page.create(1, 10);
  datas: AnalysisTaskFinishModel[] = [];
  selected?: AnalysisTaskFinishModel;

  Language = Language;
  Color = ColorTool;

  private subscription = new Subscription();

  ngOnInit(): void {
    if (this._load) {
      let sub = this._load.subscribe((args) => {
        this.filter.load(args);
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
      });
      this.subscription.add(sub);
    }
    this.filter.desc = 'StartTime';
    this.load(1, this.page.PageSize, this.filter);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private load(index: number, size: number, filter: SystemTaskTableFilter) {
    this.business
      .load(index, size, filter)
      .then((x) => {
        this.datas = x.Data;
        this.page = x.Page;
      })
      .catch((e) => this.error.emit(e));
  }

  onpage(num: number) {
    this.load(num, this.page.PageSize, this.filter);
  }
  onselect(item: AnalysisTaskModel) {
    this.selected = item;
  }

  onresult(item: AnalysisTaskModel, e: Event) {
    this.result.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  onfiles(item: AnalysisTaskModel, e: Event) {
    this.files.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }

  onsort(sort: Sort) {
    this.filter.asc = undefined;
    this.filter.desc = undefined;
    switch (sort.direction) {
      case 'asc':
        this.filter.asc = sort.active;
        break;
      case 'desc':
        this.filter.desc = sort.active;
        break;
      default:
        break;
    }
    this.load(this.page.PageIndex, this.page.PageSize, this.filter);
  }
}
