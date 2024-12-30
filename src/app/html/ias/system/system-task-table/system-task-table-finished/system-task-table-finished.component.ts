import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatorComponent } from '../../../../../common/components/paginator/paginator.component';
import { Page } from '../../../../../common/data-core/models/page-list.model';
import { ColorTool } from '../../../../../common/tools/color/color.tool';
import { Language } from '../../../../../common/tools/language';

import {
  AnalysisTaskModel,
  SystemTaskTableFilter,
} from '../system-task-table.model';
import { SystemTaskTableFinishedBusiness } from './system-task-table-finished.business';
import { SystemTaskTableFinishedConverter } from './system-task-table-finished.converter';
import { AnalysisTaskFinishModel } from './system-task-table-finished.model';

@Component({
  selector: 'ias-system-task-table-finished',
  imports: [DatePipe, CommonModule, PaginatorComponent],
  templateUrl: './system-task-table-finished.component.html',
  styleUrl: './system-task-table-finished.component.less',
  providers: [
    SystemTaskTableFinishedBusiness,
    SystemTaskTableFinishedConverter,
  ],
})
export class SystemTaskTableFinishedComponent implements OnInit {
  @Input() filter = new SystemTaskTableFilter();
  @Input('load') _load?: EventEmitter<SystemTaskTableFilter>;

  @Output() result = new EventEmitter<AnalysisTaskModel>();
  @Output() details = new EventEmitter<AnalysisTaskModel>();

  constructor(private business: SystemTaskTableFinishedBusiness) {}

  widths = [
    '100px',
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
  datas: AnalysisTaskFinishModel[] = [];
  selected?: AnalysisTaskFinishModel;

  Language = Language;
  Color = ColorTool;

  ngOnInit(): void {
    if (this._load) {
      this._load.subscribe((args) => {
        this.filter.load(args);
        this.load(this.page.PageIndex, this.page.PageSize, this.filter);
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

  onresult(item: AnalysisTaskModel, e: Event) {
    this.result.emit(item);
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
