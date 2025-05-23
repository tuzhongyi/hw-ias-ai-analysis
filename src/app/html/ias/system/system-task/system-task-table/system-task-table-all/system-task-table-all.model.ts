import { signal } from '@angular/core';
import { Exclude } from 'class-transformer';
import { AnalysisTaskModel } from '../system-task-table.model';

export class AnalysisTaskAllModel extends AnalysisTaskModel {
  @Exclude()
  UploadDuration = signal(0);
  @Exclude()
  AnalysisDuration = signal(0);
  @Exclude()
  ShopCount?: Promise<number>;
}
