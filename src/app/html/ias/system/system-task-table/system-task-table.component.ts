import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SystemTaskTableAllComponent } from './system-task-table-all/system-task-table-all.component';
import { SystemTaskTableFinishedComponent } from './system-task-table-finished/system-task-table-finished.component';
import { SystemTaskTableRuningComponent } from './system-task-table-runing/system-task-table-runing.component';
import {
  AnalysisTaskModel,
  SystemTaskTableArgs,
  SystemTaskTableFilter,
  TaskProgress,
} from './system-task-table.model';

@Component({
  selector: 'ias-system-task-table',
  imports: [
    CommonModule,
    SystemTaskTableFinishedComponent,
    SystemTaskTableRuningComponent,
    SystemTaskTableAllComponent,
  ],
  templateUrl: './system-task-table.component.html',
  styleUrl: './system-task-table.component.less',
})
export class SystemTaskTableComponent implements OnInit {
  @Input() args = new SystemTaskTableArgs();
  @Input('load') _load?: EventEmitter<SystemTaskTableArgs>;
  @Input() progress = new EventEmitter<TaskProgress>();

  @Output() delete = new EventEmitter<AnalysisTaskModel>();
  @Output() result = new EventEmitter<AnalysisTaskModel>();
  @Output() details = new EventEmitter<AnalysisTaskModel>();
  @Output() files = new EventEmitter<AnalysisTaskModel>();
  @Output() error = new EventEmitter<Error>();

  filter = new SystemTaskTableFilter();
  load = new EventEmitter<SystemTaskTableFilter>();
  ngOnInit(): void {
    this.filter.load(this.args);
    if (this._load) {
      this._load.subscribe((x) => {
        this.filter.load(x);
        this.load.emit(this.filter);
      });
    }
  }

  ondelete(data: AnalysisTaskModel) {
    this.delete.emit(data);
  }
  onresult(data: AnalysisTaskModel) {
    this.result.emit(data);
  }
  ondetails(data: AnalysisTaskModel) {
    this.details.emit(data);
  }
  onfiles(data: AnalysisTaskModel) {
    this.files.emit(data);
  }
  onerror(e: Error) {
    this.error.emit(e);
  }
}
