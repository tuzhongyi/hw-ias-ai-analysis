import { Exclude } from 'class-transformer';
import { AnalysisTaskModel } from '../system-task-table.model';

export class AnalysisTaskRuningModel extends AnalysisTaskModel {
  @Exclude()
  UploadDuration = () => {
    if (this.CreationTime) {
      return (Date.now() - this.CreationTime.getTime()) / 1000;
    }
    return 0;
  };
  @Exclude()
  AnalysisDuration = () => {
    if (this.StartTime) {
      return (Date.now() - this.StartTime.getTime()) / 1000;
    }
    return 0;
  };
  EstimatedTime = new Date();
}
