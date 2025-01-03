import { AnalysisTaskModel } from '../system-task-table.model';

export class AnalysisTaskRuningModel extends AnalysisTaskModel {
  UploadDuration = () => {
    return (Date.now() - this.CreationTime!.getTime()) / 1000;
  };
  AnalysisDuration = () => {
    return (Date.now() - this.StartTime!.getTime()) / 1000;
  };
  EstimatedTime = new Date();
}
