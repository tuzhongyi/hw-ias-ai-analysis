import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AnalysisTask } from '../../../../common/data-core/models/arm/analysis/analysis-task.model';
import { ColorTool } from '../../../../common/tools/color/color.tool';
import { Language } from '../../../../common/tools/language';
import { TaskProgress } from '../system-task-table/system-task-table.model';
import { SystemTaskDetailsInfoBusiness } from './system-task-details-info.business';
import { SystemTaskDetailsInfoConverter } from './system-task-details-info.converter';
import { SystemTaskDetailsInfo } from './system-task-details-info.model';

@Component({
  selector: 'ias-system-task-details-info',
  imports: [CommonModule, DatePipe],
  templateUrl: './system-task-details-info.component.html',
  styleUrl: './system-task-details-info.component.less',
  providers: [SystemTaskDetailsInfoConverter, SystemTaskDetailsInfoBusiness],
})
export class SystemTaskDetailsInfoComponent implements OnInit {
  @Input() data?: AnalysisTask;
  @Input() filecount = 0;
  @Input('progress') _progress?: EventEmitter<TaskProgress>;

  constructor(private business: SystemTaskDetailsInfoBusiness) {}

  Language = Language;
  Color = ColorTool;

  model?: SystemTaskDetailsInfo;
  filecompleted = 0;
  progress = 0;

  ngOnInit(): void {
    if (this.data) {
      this.business.load(this.data).then((x) => {
        this.model = x;
      });
    }
    if (this._progress) {
      this._progress.subscribe((progress) => {
        this.filecompleted = progress.completed;
        this.progress = progress.progress;
      });
    }
  }
}