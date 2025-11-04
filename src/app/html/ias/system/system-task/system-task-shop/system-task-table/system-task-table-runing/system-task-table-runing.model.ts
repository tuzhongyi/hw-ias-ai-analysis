import { signal } from '@angular/core';
import { Exclude } from 'class-transformer';
import { AnalysisTaskModel } from '../system-task-table.model';

export class AnalysisTaskRuningModel extends AnalysisTaskModel {
  @Exclude()
  UploadDuration = signal(0);
  @Exclude()
  AnalysisDuration = signal(0);
  EstimatedTime?: Date;
}
