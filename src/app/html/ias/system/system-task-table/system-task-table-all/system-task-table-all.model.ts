import { AnalysisTaskModel } from '../system-task-table.model';

export class AnalysisTaskAllModel extends AnalysisTaskModel {
  UploadDuration = () => {
    if (this.CreationTime) {
      return (Date.now() - this.CreationTime.getTime()) / 1000;
    }
    return 0;
  };
  AnalysisDuration = () => {
    if (this.StartTime) {
      if (this.StopTime) {
        return (this.StopTime.getTime() - this.StartTime.getTime()) / 1000;
      }
      return (Date.now() - this.StartTime.getTime()) / 1000;
    }
    return 0;
  };
}
