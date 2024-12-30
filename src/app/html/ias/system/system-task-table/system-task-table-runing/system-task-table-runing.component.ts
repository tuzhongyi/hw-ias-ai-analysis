import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../common/tools/language';
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
  imports: [DatePipe, CommonModule, PaginatorComponent],
  templateUrl: './system-task-table-runing.component.html',
  styleUrl: './system-task-table-runing.component.less',
  providers: [SystemTaskTableRuningConverter, SystemTaskTableRuningBusiness],
})
export class SystemTaskTableRuningComponent {
  @Input() filter = new SystemTaskTableFilter();
  @Input('load') _load?: EventEmitter<SystemTaskTableFilter>;
  @Input() progress?: EventEmitter<TaskProgress>;
  @Output() delete = new EventEmitter<AnalysisTaskModel>();
  @Output() details = new EventEmitter<AnalysisTaskModel>();

  constructor(private business: SystemTaskTableRuningBusiness) {}

  widths = [
    '100px',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    '100px',
  ];
  page = Page.create(1, 10);
  datas: AnalysisTaskRuningModel[] = [];
  selected?: AnalysisTaskRuningModel;

  Language = Language;
  Color = ColorTool;

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
}
