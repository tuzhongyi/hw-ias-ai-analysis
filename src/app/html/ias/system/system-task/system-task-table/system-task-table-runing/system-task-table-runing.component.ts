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
import { Page } from '../../../../../../common/data-core/models/page-list.model';
import { TableSorterDirective } from '../../../../../../common/directives/table-sorter/table-soater.directive';
import { Sort } from '../../../../../../common/directives/table-sorter/table-sorter.model';
import { ColorTool } from '../../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../../common/tools/language-tool/language';
import {
  AnalysisTaskModel,
  SystemTaskTableFilter,
  TaskProgress,
} from '../system-task-table.model';
import { SystemTaskTableRuningBusiness } from './system-task-table-runing.business';
import { SystemTaskTableRuningConverter } from './system-task-table-runing.converter';
import { AnalysisTaskRuningModel } from './system-task-table-runing.model';

@Component({
  selector: 'ias-system-task-table-runing',
  imports: [DatePipe, CommonModule, PaginatorComponent, TableSorterDirective],
  templateUrl: './system-task-table-runing.component.html',
  styleUrl: './system-task-table-runing.component.less',
  providers: [SystemTaskTableRuningConverter, SystemTaskTableRuningBusiness],
})
export class SystemTaskTableRuningComponent implements OnInit, OnDestroy {
  @Input() filter = new SystemTaskTableFilter();
  @Input('load') _load?: EventEmitter<SystemTaskTableFilter>;
  @Input() progress?: EventEmitter<TaskProgress>;
  @Output() delete = new EventEmitter<AnalysisTaskModel>();
  @Output() details = new EventEmitter<AnalysisTaskModel>();
  @Output() error = new EventEmitter<Error>();
  @Output() files = new EventEmitter<AnalysisTaskModel>();

  constructor(
    private business: SystemTaskTableRuningBusiness,
    private converter: SystemTaskTableRuningConverter
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
  datas: AnalysisTaskRuningModel[] = [];
  selected?: AnalysisTaskModel;

  Language = Language;
  Color = ColorTool;

  private subscription = new Subscription();

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
    this.load(1, this.page.PageSize, this.filter);

    this.refresh.handle = setInterval(() => {
      this.datas.forEach((x) => {
        this.refresh.upload(x);
        this.refresh.analysis(x);
      });
    }, 1000);
  }
  refresh = {
    handle: undefined as any,
    upload: (data: AnalysisTaskRuningModel) => {
      if (data.UploadDuration) {
        let value = this.converter.duration.upload(data);
        data.UploadDuration.set(value);
      }
    },
    analysis: (data: AnalysisTaskRuningModel) => {
      if (data.AnalysisDuration) {
        let value = this.converter.duration.analysis(data);
        data.AnalysisDuration.set(value);
      }
    },
  };

  ngOnDestroy(): void {
    if (this.refresh.handle) {
      clearInterval(this.refresh.handle);
      this.refresh.handle = undefined;
    }
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
