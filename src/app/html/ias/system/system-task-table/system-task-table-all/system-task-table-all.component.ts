import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../common/tools/language';
import {
  AnalysisTaskModel,
  SystemTaskTableFilter,
  TaskProgress,
} from '../system-task-table.model';
import { SystemTaskTableAllBusiness } from './system-task-table-all.business';
import { SystemTaskTableAllConverter } from './system-task-table-all.converter';
import { AnalysisTaskAllModel } from './system-task-table-all.model';

@Component({
  selector: 'ias-system-task-table-all',
  imports: [DatePipe, CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-task-table-all.component.html',
  styleUrl: './system-task-table-all.component.less',
  providers: [SystemTaskTableAllConverter, SystemTaskTableAllBusiness],
})
export class SystemTaskTableAllComponent implements OnInit, OnDestroy {
  @Input() filter = new SystemTaskTableFilter();
  @Input('load') _load?: EventEmitter<SystemTaskTableFilter>;
  @Input() progress?: EventEmitter<TaskProgress>;
  @Output() result = new EventEmitter<AnalysisTaskModel>();
  @Output() files = new EventEmitter<AnalysisTaskModel>();
  @Output() delete = new EventEmitter<AnalysisTaskModel>();
  @Output() details = new EventEmitter<AnalysisTaskModel>();

  constructor(
    private business: SystemTaskTableAllBusiness,
    private ref: ChangeDetectorRef
  ) {}

  widths = [
    '100px',
    'auto',
    '7%',
    '7%',
    '7%',
    '200px',
    '200px',
    '200px',
    '200px',
    '100px',
  ];
  page = Page.create(1, 10);
  datas: AnalysisTaskAllModel[] = [];
  selected?: AnalysisTaskModel;

  Language = Language;
  Color = ColorTool;

  refhandle: any;

  ngOnInit(): void {
    if (this._load) {
      this._load.subscribe((args) => {
        this.filter.load(args);
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
      });
    }
    if (this.progress) {
      this.progress.subscribe((progress) => {
        let index = this.datas.findIndex((x) => x.Id === progress.taskid);
        if (index < 0) return;
        this.datas[index].Progress = progress.progress;
      });
    }
    this.filter.asc = 'State';
    this.load(1, this.page.PageSize, this.filter);

    this.refhandle = setInterval(() => {
      this.ref.detectChanges();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.refhandle) {
      clearInterval(this.refhandle);
    }
  }

  private load(index: number, size: number, filter: SystemTaskTableFilter) {
    this.business.load(index, size, filter).then((x) => {
      this.datas = x.Data;
      this.page = x.Page;
    });
  }

  onpage(num: number) {
    this.load(num, this.page.PageSize, this.filter);
  }
  onselect(item: AnalysisTaskModel) {
    this.selected = item;
  }
  ondelete(item: AnalysisTaskModel, e: Event) {
    this.delete.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
  }
  ondetails(item: AnalysisTaskModel, e: Event) {
    this.details.emit(item);
    if (this.selected === item) {
      e.stopImmediatePropagation();
    }
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
