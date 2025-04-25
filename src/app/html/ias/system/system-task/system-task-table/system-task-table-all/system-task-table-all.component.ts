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
import { Language } from '../../../../../../common/tools/language';
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
  @Output() error = new EventEmitter<Error>();

  constructor(
    private business: SystemTaskTableAllBusiness,
    private converter: SystemTaskTableAllConverter
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
    '100px',
  ];
  page = Page.create(1, 10);
  datas: AnalysisTaskAllModel[] = [];
  selected?: AnalysisTaskModel;

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
    if (this.progress) {
      let sub = this.progress.subscribe((progress) => {
        let index = this.datas.findIndex((x) => x.Id === progress.taskid);
        if (index < 0) return;
        this.datas[index].Progress = progress.progress;
      });
      this.subscription.add(sub);
    }
    this.filter.desc = 'CreationTime';
    this.load(1, this.page.PageSize, this.filter);

    this.refresh.handle = setInterval(() => {
      this.datas.forEach((x) => {
        this.refresh.upload(x);
        this.refresh.analysis(x);
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.refresh.handle) {
      clearInterval(this.refresh.handle);
      this.refresh.handle = undefined;
    }
    this.subscription.unsubscribe();
  }

  refresh = {
    handle: undefined as any,
    upload: (data: AnalysisTaskAllModel) => {
      if (data.UploadDuration) {
        let value = this.converter.duration.upload(data);
        data.UploadDuration.set(value);
      }
    },
    analysis: (data: AnalysisTaskAllModel) => {
      if (data.AnalysisDuration) {
        let value = this.converter.duration.analysis(data);
        data.AnalysisDuration.set(value);
      }
    },
  };

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
